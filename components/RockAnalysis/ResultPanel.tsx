'use client'
import type { RockAnalysisResult } from '@/services/rockAnalysisService'

const RARITY_COLOR: Record<string, string> = {
  'شائع': 'bg-slate-100 text-slate-700',
  'غير شائع': 'bg-blue-100 text-blue-700',
  'نادر': 'bg-purple-100 text-purple-700',
  'نادر جداً': 'bg-amber-100 text-amber-700',
}

const TYPE_COLOR: Record<string, string> = {
  'ناري': 'bg-red-500',
  'رسوبي': 'bg-amber-500',
  'متحول': 'bg-emerald-500',
  'معدن': 'bg-blue-500',
}

function getTypeColor(type: string): string {
  for (const key of Object.keys(TYPE_COLOR)) {
    if (type.includes(key)) return TYPE_COLOR[key]
  }
  return 'bg-slate-500'
}

interface Props {
  result: RockAnalysisResult
}

export default function ResultPanel({ result }: Props) {
  return (
    <div dir="rtl" className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-l from-stone-700 to-stone-900 px-6 py-5 text-white">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold leading-tight">{result.arabicName}</h2>
            <p className="mt-0.5 text-sm text-stone-300 font-medium">{result.name}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {/* Type badge */}
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${getTypeColor(result.type)}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 inline-block" />
              {result.type}
            </span>
            {/* Rarity badge */}
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${RARITY_COLOR[result.rarity] ?? 'bg-slate-100 text-slate-700'}`}>
              {result.rarity}
            </span>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-stone-400">دقة التحليل</span>
            <span className="text-xs font-bold text-white">{result.confidence}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/20">
            <div
              className="h-2 rounded-full bg-gradient-to-l from-amber-400 to-amber-300 transition-all duration-700"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Origin */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">كيف تتكوّن؟</h3>
          <p className="text-sm leading-relaxed text-slate-700">{result.origin}</p>
        </div>

        {/* Characteristics */}
        {result.characteristics.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">الخصائص</h3>
            <ul className="space-y-1.5">
              {result.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Oman Connection */}
        {result.omanConnection && (
          <div className="rounded-xl bg-gradient-to-l from-emerald-50 to-teal-50 border border-emerald-100 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">🇴🇲</span>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700">الصلة بعُمان</h3>
            </div>
            <p className="text-sm leading-relaxed text-emerald-900">{result.omanConnection}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Skeleton loading state ───────────────────────────────────
export function ResultPanelSkeleton() {
  return (
    <div dir="rtl" className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden animate-pulse">
      <div className="bg-stone-800 px-6 py-5">
        <div className="h-7 w-48 rounded-lg bg-white/20 mb-2" />
        <div className="h-4 w-32 rounded-lg bg-white/10 mb-4" />
        <div className="h-2 w-full rounded-full bg-white/20" />
      </div>
      <div className="p-6 space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-24 rounded bg-slate-200 mb-3" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
