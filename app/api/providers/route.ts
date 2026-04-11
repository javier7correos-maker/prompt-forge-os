import { NextResponse } from 'next/server'
import { getAvailableProviders, getRecommendedProvider } from '@/lib/ai/providers'

export async function GET() {
  const providers = getAvailableProviders()
  const recommended = getRecommendedProvider(providers)

  return NextResponse.json(
    {
      providers,
      recommendedProvider: recommended.id,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
