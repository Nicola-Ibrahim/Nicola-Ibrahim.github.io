import { Metadata } from 'next';
import Link from 'next/link';
import { trackIds, roadmapsData } from '@/content/roadmaps';
import { TableOfContents } from '../../_components/TableOfContents';
import { TaskContent } from '../../_components/TaskContent';
import { notFound } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export async function generateStaticParams() {
  const params: { trackId: string; categorySlug: string }[] = [];

  trackIds.forEach((trackId) => {
    const roadmap = roadmapsData[trackId];
    if (roadmap) {
      roadmap.categories.forEach((category) => {
        params.push({
          trackId: trackId,
          categorySlug: category.slug,
        });
      });
    }
  });

  return params;
}

export async function generateMetadata({ params }: { params: { trackId: string; categorySlug: string } }): Promise<Metadata> {
  const { trackId, categorySlug } = await params;
  const roadmap = roadmapsData[trackId];
  if (!roadmap) return { title: 'Track Not Found' };
  
  const category = roadmap.categories.find(c => c.slug === categorySlug);
  if (!category) return { title: 'Module Not Found' };

  return {
    title: `${category.title.split(':')[1]?.trim() || category.title} - ${roadmap.title.split(' ')[0]} Track | Nicola Ibrahim Academy`,
    description: `Deep dive into ${category.title} within the ${roadmap.title}.`,
  };
}

export default async function ModulePage({ params }: { params: { trackId: string; categorySlug: string } }) {
  const { trackId, categorySlug } = await params;
  const currentRoadmap = roadmapsData[trackId];

  if (!currentRoadmap) {
    notFound();
  }

  const category = currentRoadmap.categories.find(c => c.slug === categorySlug);
  if (!category) {
    notFound();
  }

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
          <span className="text-teal-600 dark:text-teal-400">{category.title.split(':')[1]?.trim() || category.title}</span>
        </nav>

        <header className="mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-teal-600 dark:text-teal-400">
              {category.icon}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-300 uppercase tracking-tight leading-tight">
              {category.title}
            </h1>
          </div>
        </header>

        <div className="space-y-6">
          {category.tasks.map((task) => (
            <div key={task.id} id={task.id} className="scroll-mt-24">
              <TaskContent 
                task={task} 
              />
            </div>
          ))}
        </div>
      </div>

      <TableOfContents 
        tasks={category.tasks}
      />
    </div>
  );
}
