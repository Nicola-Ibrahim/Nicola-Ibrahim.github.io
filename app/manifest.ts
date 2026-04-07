import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nicola Ibrahim | Portfolio',
    short_name: 'N. Ibrahim',
    description: 'Personal portfolio of Nicola Ibrahim, showcasing high-performance backend, AI projects, and interactive technical roadmaps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
