import type { ReactNode } from 'react';
import { getFullRoadmapsData } from '../../_lib/mdx';
import { Sidebar } from '../../_components/layout/Sidebar';

export default async function ChapterLayout({ children }: { children: ReactNode }) {
  const roadmaps = Object.values(await getFullRoadmapsData());

  return (
    <div className="flex flex-col gap-8 lg:flex-row xl:gap-12">
      <Sidebar roadmaps={roadmaps} />
      <div className="min-w-0 flex-1 pb-32">{children}</div>
    </div>
  );
}
