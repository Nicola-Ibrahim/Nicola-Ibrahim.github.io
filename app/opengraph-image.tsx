import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const alt = 'Nicola Ibrahim | Software Engineer'
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
          background: '#030912',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '10px solid #102637',
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
            background: 'rgba(124, 232, 221, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: '#fff',
            fontWeight: 900,
            border: '2px solid #7ce8dd',
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
              color: '#a8bccb',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Software Engineer
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 24,
            color: '#7ce8dd',
            fontWeight: 700,
          }}
        >
          nicola-ibrahim.github.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
