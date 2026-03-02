import { ImageResponse } from 'next/og'

export function GET(request: Request) {
    let url = new URL(request.url)
    let title = url.searchParams.get('title') || 'Sophia Barnes'

    return new ImageResponse(
        (
            <div
                tw="flex flex-col w-full h-full items-center justify-center"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
                }}
            >
                <div tw="flex flex-col items-center justify-center">
                    <div
                        tw="text-6xl font-bold tracking-tight text-center px-12"
                        style={{ color: '#a78bfa' }}
                    >
                        {title}
                    </div>
                    <div
                        tw="mt-4 text-xl"
                        style={{ color: '#94a3b8' }}
                    >
                        sonya.dev
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
