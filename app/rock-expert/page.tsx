'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Video } from 'lucide-react'
import RockUploader from '@/components/RockAnalysis/RockUploader'

// LiveCamera must be client-only (uses WebSocket + getUserMedia)
const LiveCamera = dynamic(() => import('@/components/RockAnalysis/LiveCamera'), { ssr: false })

const tabs = [
  { id: 'upload', icon: ImageIcon, label: 'رفع صورة', emoji: '📸' },
  { id: 'live', icon: Video, label: 'كاميرا مباشرة', emoji: '🎥' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function RockExpertPage() {
  const [activeTab, setActiveTab] = useState<TabId>('upload')

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-800">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-20 text-center">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
            مدعوم بالذكاء الاصطناعي من Google Gemini
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            خبير الصخور{' '}
            <span className="bg-gradient-to-l from-amber-400 to-amber-200 bg-clip-text text-transparent">
              بالذكاء الاصطناعي
            </span>{' '}
            🪨
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            ارفع صورة لأي صخرة أو معدن، أو شغّل كاميرتك مباشرة — وسيحلّل الخبير الجيولوجي ما تراه ويشرح لك طبيعتها وصلتها بعُمان.
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { label: 'أنواع الصخور', value: '+1000' },
              { label: 'دقة التحليل', value: 'Gemini 2.5' },
              { label: 'البث المباشر', value: 'Real-time' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
                <p className="text-lg font-bold text-amber-400">{s.value}</p>
                <p className="text-xs text-stone-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Tabs + Content ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        {/* Tab switcher */}
        <div className="mb-8 flex rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200
                  ${active
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-stone-400 hover:text-white'
                  }`}
              >
                <span className="text-base">{tab.emoji}</span>
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl"
        >
          {activeTab === 'upload' ? (
            <RockUploader />
          ) : (
            <div className="space-y-4">
              {/* Warning banner */}
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                ⏱️ مدة الجلسة المباشرة محدودة بـ <strong>دقيقتين</strong> لكل جلسة. بإمكانك بدء جلسة جديدة في أي وقت.
              </div>
              <LiveCamera />
            </div>
          )}
        </motion.div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-stone-500">
          يستخدم هذا التطبيق <strong className="text-stone-400">Gemini 2.5 Flash</strong> لتحليل الصور و<strong className="text-stone-400">Gemini 3.1 Flash Live</strong> للبث المباشر.
          الصور لا تُخزَّن على الخادم.
        </p>
      </section>
    </div>
  )
}
