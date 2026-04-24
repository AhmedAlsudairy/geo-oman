'use client'
import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, ImagePlus, X, Loader2, Microscope } from 'lucide-react'
import type { RockAnalysisResult } from '@/services/rockAnalysisService'
import ResultPanel, { ResultPanelSkeleton } from './ResultPanel'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
const MAX_MB = 10
// Vercel serverless limit is 4.5 MB request body.
// We compress to JPEG at max 1024px and quality 0.7 to stay well under that.
const MAX_SIDE_PX = 1024
const JPEG_QUALITY = 0.7

function compressToBase64(file: File): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > MAX_SIDE_PX || height > MAX_SIDE_PX) {
        if (width >= height) {
          height = Math.round((height / width) * MAX_SIDE_PX)
          width = MAX_SIDE_PX
        } else {
          width = Math.round((width / height) * MAX_SIDE_PX)
          height = MAX_SIDE_PX
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('canvas error')); return }
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
      resolve({ data: dataUrl.split(',')[1], mimeType: 'image/jpeg' })
    }
    img.onerror = reject
    img.src = url
  })
}

export default function RockUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RockAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      setError('نوع الملف غير مدعوم. استخدم JPEG أو PNG أو WEBP')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`حجم الملف يتجاوز ${MAX_MB} ميغابايت`)
      return
    }

    setError(null)
    setResult(null)
    setPreview(URL.createObjectURL(file))

    setLoading(true)
    try {
      const { data: imageData, mimeType: compressedMime } = await compressToBase64(file)
      const res = await fetch('/api/analyze-rock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData, mimeType: compressedMime }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'فشل التحليل')
      } else {
        setResult(data)
      }
    } catch {
      setError('حدث خطأ في الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const reset = () => {
    setPreview(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return (
    <div dir="rtl" className="space-y-6">
      {/* Drop zone */}
      {!preview ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-16 text-center transition-all cursor-pointer select-none
            ${dragging
              ? 'border-amber-400 bg-amber-50 scale-[1.01]'
              : 'border-slate-300 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/40'
            }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <ImagePlus className="h-8 w-8 text-amber-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800">ارفع صورة صخرتك هنا</p>
            <p className="mt-1 text-sm text-slate-500">اسحب وأفلت أو انقر للاختيار</p>
            <p className="mt-1 text-xs text-slate-400">JPEG, PNG, WEBP — حتى {MAX_MB} MB</p>
          </div>
          <button
            type="button"
            className="mt-2 flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition"
          >
            <Upload className="h-4 w-4" />
            اختر صورة
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={onInputChange}
          />
        </div>
      ) : (
        /* Preview + reset */
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
          <div className="relative h-72 w-full bg-slate-900">
            <Image src={preview} alt="صورة الصخرة" fill className="object-contain" unoptimized />
          </div>
          <button
            type="button"
            onClick={reset}
            className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow hover:bg-white transition backdrop-blur"
          >
            <X className="h-3.5 w-3.5" />
            صورة جديدة
          </button>
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
              <p className="text-sm font-semibold text-white">يحلّل الخبير الجيولوجي...</p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <span className="mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !result && <ResultPanelSkeleton />}

      {/* Result */}
      {result && !loading && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Microscope className="h-5 w-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-800">نتيجة التحليل الجيولوجي</h3>
          </div>
          <ResultPanel result={result} />
        </div>
      )}
    </div>
  )
}
