import { MetadataRoute } from 'next'
import { getAllProjectSlugs } from './projects/_lib/mdx'
import { getFullRoadmapsData } from './roadmap/_lib/mdx'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nicolaibrahim.github.io'

  // Dynamic projects
  const projectSlugs = getAllProjectSlugs()
  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic roadmaps
  const roadmaps = await getFullRoadmapsData()
  const roadmapUrls = Object.keys(roadmaps).map((trackId) => ({
    url: `${baseUrl}/roadmap/${trackId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...projectUrls,
    ...roadmapUrls,
  ]
}
