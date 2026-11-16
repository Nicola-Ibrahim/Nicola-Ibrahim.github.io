import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const alt = 'Nicola Ibrahim | Software Engineer'
export const size = {
  width: 1200,
  height: 600,
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
          borderTop: '20px solid #7ce8dd',
        }}
      >
        <div
          style={{
            fontSize: 90,
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
    ),
    {
      ...size,
    }
  )
}
