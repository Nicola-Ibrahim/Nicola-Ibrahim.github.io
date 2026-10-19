import { Metadata } from 'next';
import Link from 'next/link';
import { TableOfContents } from '../../_components/layout/TableOfContents';
import { getTrackMeta, getCategoryMeta, getFullRoadmapsData, getUnifiedChapterContent } from '../../_lib/mdx';
import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, Home } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

// Formatting & Logic
import { generateId, extractText } from '../../_lib/mdx-utils';
import {
  CodeBlock,
  Callout
} from '../../_lib/mdx-components';

// Custom Roadmap Widgets (Client Components)
import AsyncDecisionFlowchart from '@/app/roadmap/_components/interactive/AsyncDecisionFlowchart';
import ThreadsVsCoroutines from '@/app/roadmap/_components/interactive/ThreadsVsCoroutines';
import EventLoopStepper from '@/app/roadmap/_components/interactive/EventLoopStepper';
import NotificationStrategies from '@/app/roadmap/_components/interactive/NotificationStrategies';

/**
 * mdxComponents - The Master Server-Side Registry.
 * Defining this here ensures that MDXRemote (RSC) can properly 
 * resolve both standard HTML tags and interactive Client Components during build time.
 */
function createMdxComponents() {
  const usedIds = new Map<string, number>();
  const headingId = (children: React.ReactNode) => {
    const baseId = generateId(children);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);
    return count ? `${baseId}-${count}` : baseId;
  };

  return {
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<'pre'> & { 'data-language'?: string }) => {
    const child = children as React.ReactElement<{ className?: string }>;
    const className = child?.props?.className || props['data-language'] || '';
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },

  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => {
    const text = extractText(props.children).trim();
    const match = text.match(/^\[!(info|tip|warning)\]/i);
    if (match) {
      const type = match[1].toLowerCase() as 'info' | 'tip' | 'warning';
      return React.createElement(Callout, { type, children: props.children });
    }
    return React.createElement('blockquote', {
      className: 'my-6 border-l-2 border-[#8faeae] pl-5 text-[#c6d0d5] italic leading-relaxed',
      ...props
    });
  },

  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => React.createElement('h1', {
    className: 'mb-10 text-3xl font-bold leading-[1.14] tracking-tight text-[#e8eef0] md:text-[2.7rem]',
    ...props
  }),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => React.createElement('h2', { id: headingId(props.children), className: 'mt-14 mb-6 scroll-mt-28 border-l-[3px] border-[#8faeae] pl-4 text-xl font-semibold tracking-tight text-[#e5ebed] md:text-2xl', ...props }),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => React.createElement('h3', { id: headingId(props.children), className: 'mt-10 mb-5 scroll-mt-28 text-lg font-semibold tracking-tight text-[#dce4e7] md:text-xl', ...props }),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => React.createElement('h4', { id: headingId(props.children), className: 'mt-8 mb-4 scroll-mt-28 text-base font-semibold tracking-tight text-[#d7e0e3] md:text-lg', ...props }),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => React.createElement('p', { className: 'mb-6 max-w-[72ch] text-[15px] leading-[1.8] text-[#c8d2d7] sm:text-base', ...props }),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => React.createElement('ul', { className: 'mb-8 list-disc space-y-3 pl-6 text-[15px] leading-[1.75] text-[#c8d2d7] sm:text-base', ...props }),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => React.createElement('li', { className: 'leading-relaxed', ...props }),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => React.createElement('strong', { className: 'font-semibold text-[#d7e0e3]', ...props }),

  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="my-10 overflow-x-auto rounded-xl border border-white/10 bg-[#252e36]">
      <table className="w-full text-left border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-white/10 bg-white/[0.025]" {...props} />
  ),
  tr: (props: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-b border-white/[0.07] last:border-0 hover:bg-white/[0.025] transition-colors" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<'th'>) => (
    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-[#dfe6e9]" {...props} />
  ),
  td: (props: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="px-6 py-4 text-[14px] leading-relaxed text-[#c8d2d7]" {...props} />
  ),

  code: (props: React.ComponentPropsWithoutRef<'code'>) => {
    const isInline = !props.className;
    if (!isInline) return <code {...props} />;
    return (
      <code
        className="mx-[0.1em] rounded border border-white/10 bg-white/[0.06] px-[0.3em] py-[0.1em] font-mono text-[0.85em] font-medium text-[#dce6e8]"
        {...props}
      />
    );
  },

  AsyncDecisionFlowchart,
  ThreadsVsCoroutines,
  EventLoopStepper,
  NotificationStrategies,
  };
}

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

export async function generateMetadata({ params }: { params: Promise<{ trackId: string; categorySlug: string }> }): Promise<Metadata | null> {
  const { trackId, categorySlug } = await params;
  const track = getTrackMeta(trackId);
  if (!track) return { title: 'Track Not Found' };

  const category = getCategoryMeta(trackId, categorySlug);
  if (!category) return { title: 'Module Not Found' };

  return {
    title: `${category.title.split(':')[1]?.trim() || category.title} | ${track.title}`,
    description: `Study notes on ${category.title} in the ${track.title} track.`,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ trackId: string; categorySlug: string }> }) {
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
  const categoryIndex = roadmap.categories.findIndex(c => c.slug === categorySlug);
  const previousCategory = roadmap.categories[categoryIndex - 1];
  const nextCategory = roadmap.categories[categoryIndex + 1];

  const unifiedMdx = await getUnifiedChapterContent(trackId, categorySlug);
  if (!unifiedMdx) {
    notFound();
  }

  return (
    <div className="flex gap-8 xl:gap-12 pt-2">
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#aebdc4]">
          <Link href="/" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href="/roadmap" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Roadmaps</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href={`/roadmap/${trackId}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {currentRoadmap.title}
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-[#dce6e8]">{categoryMeta.title.split(':')[1]?.trim() || categoryMeta.title}</span>
        </nav>

        <div className="mb-9 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#c3d7d7]">Chapter {String(categoryIndex + 1).padStart(2, '0')} / {String(roadmap.categories.length).padStart(2, '0')}</p>
          <p className="m-0 text-sm text-[#b8c6cd]">{category.content.length} topics in this chapter</p>
        </div>

        <article className="roadmap-article prose max-w-none">
          <MDXRemote
            source={unifiedMdx.source}
            components={createMdxComponents()}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: 'github-dark',
                      keepBackground: false,
                    },
                  ],
                ],
              }
            }}
          />
        </article>

        <nav aria-label="Chapter navigation" className="mt-16 grid gap-3 border-t border-white/10 pt-7 sm:grid-cols-2">
          {previousCategory ? (
            <Link href={`/roadmap/${trackId}/${previousCategory.slug}`} className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-teal-400/40 focus-visible:outline-2 focus-visible:outline-teal-400">
              <span className="mb-2 flex items-center gap-2 text-xs text-teal-300"><ArrowLeft size={14} /> Previous chapter</span>
              <strong className="text-sm text-slate-100 group-hover:text-white">{previousCategory.title}</strong>
            </Link>
          ) : <span />}
          {nextCategory && (
            <Link href={`/roadmap/${trackId}/${nextCategory.slug}`} className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-teal-400/40 focus-visible:outline-2 focus-visible:outline-teal-400">
              <span className="mb-2 flex items-center gap-2 text-xs text-teal-300">Next chapter <ArrowRight size={14} /></span>
              <strong className="text-sm text-slate-100 group-hover:text-white">{nextCategory.title}</strong>
            </Link>
          )}
        </nav>
      </div>

      <TableOfContents content={category.content} />
    </div>
  );
}
