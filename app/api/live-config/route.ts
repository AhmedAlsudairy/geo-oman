import { NextResponse } from 'next/server'
import { buildLiveWsUrl } from '@/services/rockAnalysisService'

export async function GET() {
  try {
    const wsUrl = buildLiveWsUrl()
    return NextResponse.json({ wsUrl })
  } catch {
    return NextResponse.json(
      { error: 'مفتاح Gemini API غير مضبوط على الخادم' },
      { status: 500 }
    )
  }
}
