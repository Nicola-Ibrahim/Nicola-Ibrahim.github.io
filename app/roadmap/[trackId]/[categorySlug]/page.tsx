import { Metadata } from 'next';
import Link from 'next/link';
import { TableOfContents } from '../../_components/layout/TableOfContents';
import { ModuleContent } from '../../_components/layout/ModuleContent';
import { getTrackMeta, getCategoryMeta, getFullRoadmapsData, getAllCategoryContent } from '../../_lib/mdx';
import { getIcon } from '../../_lib/icon-registry';
import { notFound } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export async function generateStaticParams() {
  const roadmaps = await getFullRoadmapsData();
  const params: { trackId: string; categorySlug: string }[] = [];

  Object.entries(roadmaps).forEach(([trackId, roadmap]) => {
    roadmap.categories.forEach((category) => {
      params.push({
        trackId: trackId,
        categorySlug: category.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: { trackId: string; categorySlug: string } }): Promise<Metadata | null> {
  const { trackId, categorySlug } = await params;
  const track = getTrackMeta(trackId);
  if (!track) return { title: 'Track Not Found' };
  
  const category = getCategoryMeta(trackId, categorySlug);
  if (!category) return { title: 'Module Not Found' };

  return {
    title: `${category.title.split(':')[1]?.trim() || category.title} - ${track.title.split(' ')[0]} Track | Nicola Ibrahim Academy`,
    description: `Deep dive into ${category.title} within the ${track.title}.`,
  };
}

export default async function ModulePage({ params }: { params: { trackId: string; categorySlug: string } }) {
  const { trackId, categorySlug } = await params;
  const currentRoadmap = getTrackMeta(trackId);

  if (!currentRoadmap) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(trackId, categorySlug);
  if (!categoryMeta) {
    notFound();
  }

  const allRoadmaps = await getFullRoadmapsData();
  const roadmap = allRoadmaps[trackId];
  const category = roadmap?.categories.find(c => c.slug === categorySlug);
  
  if (!category) {
    notFound();
  }

  // Fetch MDX content for all topics in this category
  const topicIds = category.content.map(item => item.id);
  const mdxContents = await getAllCategoryContent(trackId, categorySlug, topicIds);

  return (
    <div className="flex gap-8 xl:gap-12">
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          <Link href="/" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Home className="w-3.5 h-3.5" /> Academy
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href="/roadmap" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Documentation</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href={`/roadmap/${trackId}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {currentRoadmap.title.split(' ')[0]} Track
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-teal-600 dark:text-teal-400">{categoryMeta.title.split(':')[1]?.trim() || categoryMeta.title}</span>
        </nav>

        <header className="mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-teal-600 dark:text-teal-400">
              {getIcon(categoryMeta.icon)}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-300 uppercase tracking-tight leading-tight">
              {categoryMeta.title}
            </h1>
          </div>
        </header>

        <div className="space-y-6">
          {category.content.map((item) => {
            const mdx = mdxContents[item.id];
            
            // Merge metadata from MDX frontmatter if available
            const mergedItem = mdx ? {
              ...item,
              title: mdx.frontmatter.title || item.title,
              shortDesc: mdx.frontmatter.shortDesc || item.shortDesc,
              prompt: mdx.frontmatter.prompt || item.prompt,
              links: mdx.frontmatter.links || item.links,
            } : item;

            return (
              <div key={item.id} id={item.id} className="scroll-mt-24">
                <ModuleContent 
                  content={mergedItem}
                  mdxSource={mdx?.source}
                />
              </div>
            );
          })}
        </div>
      </div>

      <TableOfContents 
        content={category.content}
      />
    </div>
  );
}
