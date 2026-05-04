import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, GoogleGenerativeAIFetchError, GoogleGenerativeAIResponseError } from '@google/generative-ai'
import { ROCK_EXPERT_SYSTEM_PROMPT, parseRockAnalysis } from '@/services/rockAnalysisService'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryable(err: unknown): boolean {
  if (err instanceof GoogleGenerativeAIFetchError) {
    return err.status === 429 || err.status === 503 || err.status === 500
  }
  // Safety-filter blocks are not transient — do not retry them
  if (err instanceof GoogleGenerativeAIResponseError) {
    return false
  }
  // Retry on generic network errors (no status code)
  if (err instanceof Error && !('status' in err)) {
    return true
  }
  return false
}

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

    let lastErr: unknown
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          await sleep(RETRY_DELAY_MS * Math.pow(2, attempt - 1))
        }

        const result = await model.generateContent([
          {
            inlineData: {
              data: imageData,
              mimeType,
            },
          },
          'حلّل هذه الصخرة أو المعدن في الصورة وأعطني نتيجتك بتنسيق JSON المطلوب.',
        ])

        // response.text() throws GoogleGenerativeAIResponseError when the
        // response was blocked by safety filters or has no candidates.
        let text: string
        try {
          text = result.response.text()
        } catch (responseErr) {
          if (responseErr instanceof GoogleGenerativeAIResponseError) {
            console.warn('[analyze-rock] response blocked by safety filters:', responseErr.message)
            return NextResponse.json(
              { error: 'لم يتمكن النموذج من تحليل هذه الصورة. تأكد من وضوح الصخرة في الصورة وحاول مرة أخرى.' },
              { status: 422 }
            )
          }
          throw responseErr
        }

        if (!text || !text.trim()) {
          console.warn('[analyze-rock] empty response from model')
          return NextResponse.json(
            { error: 'لم يُرجع النموذج أي نتيجة. يرجى المحاولة مرة أخرى.' },
            { status: 502 }
          )
        }

        const analysis = parseRockAnalysis(text)
        return NextResponse.json(analysis)
      } catch (err) {
        lastErr = err
        if (!isRetryable(err) || attempt === MAX_RETRIES) {
          break
        }
        console.warn(`[analyze-rock] transient error on attempt ${attempt + 1}, retrying...`, err)
      }
    }

    // All attempts exhausted — map known error types to helpful messages
    console.error('[analyze-rock]', lastErr)

    if (lastErr instanceof GoogleGenerativeAIFetchError) {
      if (lastErr.status === 429) {
        return NextResponse.json(
          { error: 'الخادم مشغول حالياً. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.' },
          { status: 429 }
        )
      }
      if (lastErr.status === 503) {
        return NextResponse.json(
          { error: 'خدمة الذكاء الاصطناعي غير متاحة مؤقتاً. يرجى المحاولة بعد لحظات.' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  } catch (err) {
    console.error('[analyze-rock]', err)
    return NextResponse.json(
      { error: 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
