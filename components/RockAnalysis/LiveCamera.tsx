'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Video, VideoOff, Loader2, Volume2, VolumeX, SwitchCamera } from 'lucide-react'
import { LIVE_ROCK_EXPERT_PROMPT } from '@/services/rockAnalysisService'

const MODEL = 'gemini-3.1-flash-live-preview'
const FRAME_INTERVAL_MS = 1000
const TEXT_PROMPT_INTERVAL_MS = 5000
const SESSION_LIMIT_MS = 110 * 1000
const SETUP_TIMEOUT_MS = 15000 // bail if setupComplete never arrives

type Status = 'idle' | 'connecting' | 'live' | 'error' | 'ended'

function pcmToFloat32(buffer: ArrayBuffer): Float32Array {
  const view = new DataView(buffer)
  const out = new Float32Array(view.byteLength / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = view.getInt16(i * 2, true) / 32768
  }
  return out
}

export default function LiveCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const nextAudioTimeRef = useRef<number>(0)   // scheduled end of last audio chunk
  const streamRef = useRef<MediaStream | null>(null)
  const frameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sessionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setupDoneRef = useRef(false)
  // Tracks live state inside WS closures — avoids stale 'status' state captures
  const isLiveRef = useRef(false)

  const [status, setStatus] = useState<Status>('idle')
  const [transcript, setTranscript] = useState<string>('')
  const [liveText, setLiveText] = useState<string>('')
  const [muted, setMuted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(SESSION_LIMIT_MS / 1000)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')


  // ── Countdown ticker ────────────────────────────────────────
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAll = useCallback(() => {
    clearInterval(frameTimerRef.current!)
    clearInterval(textTimerRef.current!)
    clearTimeout(sessionTimerRef.current!)
    clearInterval(countdownRef.current!)
    clearTimeout(setupTimeoutRef.current!)
    frameTimerRef.current = null
    textTimerRef.current = null
    sessionTimerRef.current = null
    countdownRef.current = null
    setupTimeoutRef.current = null

    // Null out handlers before closing — prevents recursive onclose triggers
    if (wsRef.current) {
      wsRef.current.onopen = null
      wsRef.current.onmessage = null
      wsRef.current.onerror = null
      wsRef.current.onclose = null
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close()
      }
      wsRef.current = null
    }

    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null

    audioCtxRef.current?.close().catch(() => {})
    audioCtxRef.current = null
    nextAudioTimeRef.current = 0

    setupDoneRef.current = false
    isLiveRef.current = false
  }, [])

  // ── Send a JPEG frame via WebSocket ─────────────────────────
  const sendFrame = useCallback(() => {
    const ws = wsRef.current
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN || !canvas || !video) return

    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
    const base64 = dataUrl.split(',')[1]

    ws.send(JSON.stringify({
      realtimeInput: {
        video: { data: base64, mimeType: 'image/jpeg' },
      },
    }))
  }, [])

  // ── Send text prompt ─────────────────────────────────────────
  const sendTextPrompt = useCallback(() => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return
    ws.send(JSON.stringify({
      realtimeInput: { text: 'ما هذه الصخرة أو المعدن الذي تراه؟ اشرح لي باختصار.' },
    }))
  }, [])

  // ── Play PCM audio from Gemini ───────────────────────────────
  // Chunks are scheduled sequentially on the AudioContext clock to prevent
  // overlap or gaps. nextAudioTimeRef tracks the end time of the last chunk.
  const playPcm = useCallback((b64: string) => {
    if (muted) return
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext({ sampleRate: 24000 })
      }
      const ctx = audioCtxRef.current

      // Resume if browser suspended it (autoplay policy)
      if (ctx.state === 'suspended') ctx.resume()

      const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
      const samples = pcmToFloat32(raw.buffer)
      const buf = ctx.createBuffer(1, samples.length, 24000)
      buf.copyToChannel(samples, 0)

      // Schedule this chunk to start right after the previous one ends.
      // If we've fallen behind real-time (long gap), reset to now.
      const startAt = Math.max(ctx.currentTime, nextAudioTimeRef.current)
      nextAudioTimeRef.current = startAt + buf.duration

      const src = ctx.createBufferSource()
      src.buffer = buf
      src.connect(ctx.destination)
      src.start(startAt)
    } catch (e) {
      console.warn('[LiveCamera] audio playback error', e)
    }
  }, [muted])

  // ── Start session ────────────────────────────────────────────
  const start = useCallback(async () => {
    setError(null)
    setTranscript('')
    setLiveText('')
    setStatus('connecting')
    setSecondsLeft(SESSION_LIMIT_MS / 1000)

    try {
      // 1. Get webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // 2. Fetch WSS URL from server (API key stays server-side)
      const configRes = await fetch('/api/live-config')
      if (!configRes.ok) {
        const d = await configRes.json()
        throw new Error(d.error ?? 'فشل جلب إعدادات الاتصال')
      }
      const { wsUrl } = await configRes.json()

      // 3. Open WebSocket
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      // Bail if setupComplete never arrives within timeout
      setupTimeoutRef.current = setTimeout(() => {
        if (!setupDoneRef.current) {
          setError('انتهت مهلة الاتصال. تحقق من مفتاح Gemini API في Vercel وحاول مجدداً.')
          setStatus('error')
          stopAll()
        }
      }, SETUP_TIMEOUT_MS)

      ws.onopen = () => {
        // Raw WebSocket proto field is "setup", NOT "config".
        // responseModalities must be nested inside generationConfig.
        // outputAudioTranscription and systemInstruction are top-level setup fields.
        ws.send(JSON.stringify({
          setup: {
            model: `models/${MODEL}`,
            generationConfig: {
              responseModalities: ['AUDIO'],
            },
            outputAudioTranscription: {},
            systemInstruction: { parts: [{ text: LIVE_ROCK_EXPERT_PROMPT }] },
          },
        }))
      }

      // Gemini Live sends frames as Blobs, not plain strings
      ws.binaryType = 'blob'

      ws.onmessage = async (event) => {
        try {
          // Decode Blob → text, or use string directly
          const text: string =
            event.data instanceof Blob
              ? await (event.data as Blob).text()
              : (event.data as string)

          const msg = JSON.parse(text)

          // ── Handle setupComplete (first message) ──
          if (!setupDoneRef.current) {
            // Check for server-side error during setup
            if (msg.error) {
              clearTimeout(setupTimeoutRef.current!)
              setError(`خطأ من خادم Gemini: ${msg.error.message ?? JSON.stringify(msg.error)}`)
              setStatus('error')
              stopAll()
              return
            }
            // First non-error message = setupComplete
            clearTimeout(setupTimeoutRef.current!)
            setupDoneRef.current = true
            isLiveRef.current = true
            setStatus('live')

            frameTimerRef.current = setInterval(sendFrame, FRAME_INTERVAL_MS)
            textTimerRef.current = setInterval(sendTextPrompt, TEXT_PROMPT_INTERVAL_MS)
            sendTextPrompt()

            sessionTimerRef.current = setTimeout(() => {
              setStatus('ended')
              stopAll()
            }, SESSION_LIMIT_MS)

            countdownRef.current = setInterval(() => {
              setSecondsLeft((s) => {
                if (s <= 1) { clearInterval(countdownRef.current!); return 0 }
                return s - 1
              })
            }, 1000)
            return
          }

          // ── Handle model responses ──
          const sc = msg.serverContent
          if (!sc) return

          if (sc.modelTurn?.parts) {
            for (const part of sc.modelTurn.parts) {
              if (part.inlineData?.mimeType?.startsWith('audio/')) {
                playPcm(part.inlineData.data)
              }
            }
          }

          if (sc.outputTranscription?.text) {
            setLiveText(sc.outputTranscription.text)
            setTranscript((prev) => prev + sc.outputTranscription.text)
          }
        } catch {
          // Non-JSON message — ignore
        }
      }

      ws.onerror = () => {
        // ws.onclose fires right after; handle status transition there
        console.warn('[LiveCamera] WebSocket error')
      }

      // ── KEY FIX: use isLiveRef not stale 'status' state ──
      ws.onclose = (event) => {
        if (isLiveRef.current) {
          setStatus('ended')
        } else if (!setupDoneRef.current) {
          const reason = event.reason || `code ${event.code}`
          setError(`فشل الاتصال بالخبير الجيولوجي (${reason})`)
          setStatus('error')
        }
        stopAll()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'خطأ غير متوقع'
      setError(msg)
      setStatus('error')
      stopAll()
    }
  // 'status' intentionally excluded — using isLiveRef inside WS closures instead
  }, [facingMode, sendFrame, sendTextPrompt, playPcm, stopAll])

  // ── Switch camera (front / rear) ────────────────────────────
  const switchCamera = useCallback(async () => {
    const newFacing = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(newFacing)

    // If live, swap the stream without killing the WebSocket session
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacing },
          audio: false,
        })
        streamRef.current = newStream
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
          videoRef.current.play()
        }
      } catch {
        setError('تعذّر التبديل بين الكاميرات')
      }
    }
  }, [facingMode])

  const stop = useCallback(() => {
    setStatus('ended')
    stopAll()
  }, [stopAll])

  // Cleanup on unmount
  useEffect(() => () => stopAll(), [stopAll])

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60

  return (
    <div dir="rtl" className="space-y-5">
      {/* Video feed */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl" style={{ minHeight: 320 }}>
        <video
          ref={videoRef}
          muted
          playsInline
          className={`w-full rounded-2xl object-cover transition-opacity ${status === 'live' ? 'opacity-100' : 'opacity-40'}`}
          style={{ maxHeight: 460 }}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Overlay: idle */}
        {status === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <Video className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-white/70">ابدأ الجلسة لتشغيل الكاميرا</p>
          </div>
        )}

        {/* Overlay: connecting */}
        {status === 'connecting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
            <p className="text-sm font-semibold text-white">جارٍ الاتصال بالخبير الجيولوجي...</p>
            <p className="text-xs text-white/50">قد يستغرق حتى 15 ثانية</p>
          </div>
        )}

        {/* Overlay: error */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 px-6 text-center">
            <VideoOff className="h-10 w-10 text-red-400" />
            <p className="text-sm font-semibold text-red-300">{error}</p>
          </div>
        )}

        {/* Overlay: ended */}
        {status === 'ended' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
            <p className="text-base font-bold text-white">انتهت الجلسة</p>
            <p className="text-xs text-white/60">الحد الأقصى للجلسة دقيقتان</p>
          </div>
        )}

        {/* Live badge + timer */}
        {status === 'live' && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              مباشر
            </span>
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-mono text-white backdrop-blur">
              {mins}:{secs.toString().padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Top-left controls: mute + switch camera */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="flex items-center justify-center rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70 transition"
            title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={switchCamera}
            className="flex items-center justify-center rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70 transition"
            title={facingMode === 'environment' ? 'تحويل للكاميرا الأمامية' : 'تحويل للكاميرا الخلفية'}
          >
            <SwitchCamera className="h-4 w-4" />
          </button>
        </div>

        {/* Live transcript overlay */}
        {liveText && status === 'live' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
            <p className="text-sm font-medium text-white leading-relaxed text-right line-clamp-3">{liveText}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 justify-center">
        {status === 'idle' || status === 'error' || status === 'ended' ? (
          <button
            type="button"
            onClick={start}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition"
          >
            <Video className="h-5 w-5" />
            {status === 'ended' ? 'جلسة جديدة' : 'ابدأ البث المباشر'}
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="flex items-center gap-2 rounded-xl bg-slate-700 px-8 py-3 text-sm font-bold text-white shadow hover:bg-slate-800 transition"
          >
            <VideoOff className="h-5 w-5" />
            إيقاف
          </button>
        )}
      </div>

      {/* Info banner */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-700">
        🎥 يستخدم هذا الوضع <strong>Gemini 3.1 Flash Live</strong> عبر WebSocket مباشرة — يحلّل الكاميرا بشكل فوري ويتحدث إليك باللغة العربية. مدة الجلسة القصوى دقيقتان.
      </div>

      {/* Full transcript */}
      {transcript && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">ما قاله الخبير</h4>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  )
}
