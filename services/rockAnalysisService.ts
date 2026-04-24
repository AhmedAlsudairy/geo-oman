// ─────────────────────────────────────────────────────────────
// Rock Analysis Service
// Used by API routes (server-side only — API key stays safe)
// ─────────────────────────────────────────────────────────────

export interface RockAnalysisResult {
  name: string
  arabicName: string
  type: string
  origin: string
  characteristics: string[]
  rarity: 'شائع' | 'غير شائع' | 'نادر' | 'نادر جداً'
  omanConnection: string
  confidence: number // 0–100
  rawText?: string
}

export const ROCK_EXPERT_SYSTEM_PROMPT = `أنت خبير جيولوجي متخصص في الصخور والمعادن العمانية والعربية.
عندما يُرسل إليك صورة لصخرة أو معدن، قدّم تحليلاً علمياً دقيقاً باللغة العربية.

يجب أن يكون ردّك دائماً بتنسيق JSON صالح بالضبط على النحو التالي:
{
  "name": "الاسم العلمي بالإنجليزية",
  "arabicName": "الاسم العربي",
  "type": "نوع الصخرة (ناري/رسوبي/متحول/معدن)",
  "origin": "كيف تتكوّن هذه الصخرة",
  "characteristics": ["خاصية 1", "خاصية 2", "خاصية 3", "خاصية 4"],
  "rarity": "شائع أو غير شائع أو نادر أو نادر جداً",
  "omanConnection": "وصف العلاقة بين هذه الصخرة وعُمان أو الجزيرة العربية",
  "confidence": رقم من 0 إلى 100
}

لا تضف أي نص خارج كتلة JSON. إذا لم تستطع التعرف على الصخرة، اعطِ أفضل تقدير مع confidence منخفض.
تحدث دائماً بصوت خبير جيولوجي متحمس لعلم الجيولوجيا العمانية.`

export const LIVE_ROCK_EXPERT_PROMPT = `أنت خبير جيولوجي عماني. تشاهد كاميرا مباشرة وتسمع المستخدم.
قواعد:
1. عندما ترى صخرة أو معدن: قل اسمه ونوعه وعلاقته بعُمان في جملتين أو ثلاث فقط ثم توقف.
2. علاقة الصخور بعُمان: عُمان غنية بالأوفيوليت (صخور الغلاف الصخري البحري المكشوف)، الدولوميت، الحجر الجيري، السيرپانتينيت، الكروميت، النحاس (تاريخ ألفي عام)، والجبال الشاهقة مثل الحجر.
3. إذا تحدث المستخدم، أجبه مباشرة باختصار.
4. لا تتكلم إذا لم يتغير المشهد ولم يسألك أحد.
مثال: "هذا حجر الجرانيت، صخرة نارية. في عُمان يوجد كثيراً في منطقة الحجر الغربي."

export function buildLiveWsUrl(): string {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not set')
  return `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${key}`
}

export function parseRockAnalysis(text: string): RockAnalysisResult {
  // Strip markdown fencing if present
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  try {
    const parsed = JSON.parse(cleaned)
    return {
      name: parsed.name ?? 'Unknown',
      arabicName: parsed.arabicName ?? 'غير محدد',
      type: parsed.type ?? 'غير محدد',
      origin: parsed.origin ?? '',
      characteristics: Array.isArray(parsed.characteristics) ? parsed.characteristics : [],
      rarity: parsed.rarity ?? 'غير شائع',
      omanConnection: parsed.omanConnection ?? '',
      confidence: typeof parsed.confidence === 'number' ? Math.min(100, Math.max(0, parsed.confidence)) : 70,
      rawText: text,
    }
  } catch {
    // Fallback: return partial result with raw text
    return {
      name: 'غير محدد',
      arabicName: 'غير محدد',
      type: 'غير محدد',
      origin: text.slice(0, 300),
      characteristics: [],
      rarity: 'غير شائع',
      omanConnection: '',
      confidence: 30,
      rawText: text,
    }
  }
}
