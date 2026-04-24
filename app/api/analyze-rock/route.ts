import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ROCK_EXPERT_SYSTEM_PROMPT, parseRockAnalysis } from '@/services/rockAnalysisService'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح Gemini API غير مضبوط على الخادم' }, { status: 500 })
    }

    const body = await req.json()
    const { imageData, mimeType } = body as { imageData?: string; mimeType?: string }

    if (!imageData || !mimeType) {
      return NextResponse.json({ error: 'البيانات مطلوبة: imageData و mimeType' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json({ error: 'نوع الملف غير مدعوم. استخدم JPEG أو PNG أو WEBP' }, { status: 400 })
    }

    // Validate base64 size
    const sizeBytes = (imageData.length * 3) / 4
    if (sizeBytes > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'حجم الصورة كبير جداً (الحد الأقصى 10 ميغابايت)' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: ROCK_EXPERT_SYSTEM_PROMPT,
    })

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageData,
          mimeType,
        },
      },
      'حلّل هذه الصخرة أو المعدن في الصورة وأعطني نتيجتك بتنسيق JSON المطلوب.',
    ])

    const text = result.response.text()
    const analysis = parseRockAnalysis(text)

    return NextResponse.json(analysis)
  } catch (err) {
    console.error('[analyze-rock]', err)
    return NextResponse.json(
      { error: 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
