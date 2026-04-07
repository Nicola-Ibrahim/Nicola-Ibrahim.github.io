import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'

export const alt = 'Nicola Ibrahim | Backend Engineer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '10px solid #111111',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: '#fff',
            fontWeight: 900,
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          NI
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 20,
              letterSpacing: '-0.05em',
            }}
          >
            Nicola Ibrahim
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#888888',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Backend Engineer & AI Architect
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 24,
            color: '#444444',
            fontWeight: 700,
          }}
        >
          nicolaibrahim.github.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
