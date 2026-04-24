import { NextResponse } from 'next/server'
import { buildLiveWsUrl } from '@/services/rockAnalysisService'

// Force dynamic so Next.js never statically generates this route.
// The API key must be read at runtime, not baked in at build time.
export const dynamic = 'force-dynamic'

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
}

export async function GET() {
  try {
    const wsUrl = buildLiveWsUrl()
    return NextResponse.json({ wsUrl }, { headers: NO_CACHE_HEADERS })
  } catch {
    return NextResponse.json(
      { error: 'مفتاح Gemini API غير مضبوط على الخادم' },
      { status: 500, headers: NO_CACHE_HEADERS }
    )
  }
}
