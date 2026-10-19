"use client";

import React from 'react';
import Link from 'next/link';
import { RoadmapData } from '../../_lib/mdx';
import { getIcon } from '../../_lib/icon-registry';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  roadmaps: RoadmapData[];
}

export function Sidebar({
  roadmaps,
}: SidebarProps) {
  const pathname = usePathname();

  // Detect active track and category from the URL
  const segments = pathname.split('/').filter(Boolean);
  const activeTab = segments[1]; // /roadmap/[trackId]
  const activeCategory = segments[2]; // /roadmap/[trackId]/[categorySlug]

  return (
    <>
      <nav aria-label="Roadmap navigation" className="lg:hidden w-full mb-6">
        <details className="rounded-xl border border-white/10 bg-white/[0.03]">
          <summary className="cursor-pointer px-4 py-3 font-medium text-[#dce6e8]">Browse tracks and chapters</summary>
          <div className="max-h-[55vh] overflow-y-auto border-t border-white/10 px-4 py-3">
            <Link href="/roadmap" className="block py-2 text-sm text-[#c6d9d7]">All tracks</Link>
            {roadmaps.map(track => (
              <div key={track.id} className="border-t border-white/10 py-2">
                <Link href={`/roadmap/${track.id}`} aria-current={activeTab === track.id && !activeCategory ? 'page' : undefined} className="block py-1 text-sm font-medium text-[#dce6e8]">{track.title}</Link>
                {activeTab === track.id && track.categories.map(category => (
                  <Link key={category.slug} href={`/roadmap/${track.id}/${category.slug}`} aria-current={activeCategory === category.slug ? 'page' : undefined} className="block py-1.5 pl-4 text-sm text-[#b8c7cd] aria-[current=page]:font-semibold aria-[current=page]:text-[#e1e9eb]">
                    {category.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </details>
      </nav>
      <aside className="w-[280px] hidden lg:block sticky top-28 self-start h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
      <div className="mb-5 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b7c6cc]">
          Tracks
        </h2>
      </div>

      <div className="space-y-1 px-3">
        {roadmaps.map((tab) => (
          <React.Fragment key={tab.id}>
            <Link
              href={`/roadmap/${tab.id}`}
              className={`group flex w-full items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${activeTab === tab.id
                ? 'border-white/10 bg-white/[0.055]'
                : 'border-transparent text-[#afbec5] hover:bg-white/[0.035]'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${activeTab === tab.id
                  ? 'bg-white/10 text-[#c5d9d6]'
                  : 'bg-white/[0.04] text-[#aebfc5] group-hover:bg-white/[0.07]'
                  }`}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    {getIcon(tab.icon)}
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-[13px] leading-snug ${activeTab === tab.id ? 'font-semibold text-[#e1e9eb]' : 'font-medium text-[#b7c5cb]'
                    }`}>
                    {tab.title}
                  </p>
                </div>
              </div>
              {activeTab === tab.id && (
                <ChevronRight className="h-3.5 w-3.5 text-[#b7cfcc]" />
              )}
            </Link>

            {/* Render Category List if active */}
            {activeTab === tab.id && (
              <div className="mb-5 ml-[23px] mt-1 space-y-0.5 overflow-hidden border-l border-white/10">
                {tab.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/roadmap/${tab.id}/${cat.slug}`}
                    className={`relative block py-2.5 pl-5 pr-3 text-[12px] leading-snug transition-colors ${activeCategory === cat.slug
                      ? 'bg-white/[0.035] font-semibold text-[#e1e9eb]'
                      : 'font-medium text-[#aebfc5] hover:text-[#e1e9eb]'
                      }`}
                  >
                    {activeCategory === cat.slug && (
                      <div className="absolute bottom-0 left-[-1px] top-0 w-[2px] bg-[#9dbdb9]" />
                    )}
                    <span className="truncate block">
                      {cat.title.split(':')[1]?.trim() || cat.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      </aside>
    </>
  );
}
