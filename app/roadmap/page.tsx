import Link from 'next/link';
import { getFullRoadmapsData } from './_lib/mdx';

export default async function RoadmapPage() {
  const roadmaps = Object.values(await getFullRoadmapsData());

  return (
    <section className="max-w-5xl mx-auto py-8 sm:py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 mb-4">Study references</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Technical roadmaps</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-10">Notes grouped by engineering topic. Choose a track to see its chapters.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {roadmaps.map(track => (
          <Link key={track.id} href={`/roadmap/${track.id}`} className="group block rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 hover:border-teal-500/50 focus-visible:outline-2 focus-visible:outline-teal-500">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400">{track.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{track.categories.length} chapters</p>
            <span className="inline-block mt-5 text-sm font-medium text-teal-700 dark:text-teal-400">View chapters <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
