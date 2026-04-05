import React from 'react';
import { Terminal, Copy, Check, ExternalLink } from 'lucide-react';
import AsyncDecisionFlowchart from '@/app/roadmap/_content/backend/_components/AsyncDecisionFlowchart';
import ThreadsVsCoroutines from '@/app/roadmap/_content/backend/_components/ThreadsVsCoroutines';
import EventLoopStepper from '@/app/roadmap/_content/backend/_components/EventLoopStepper';
import NotificationStrategies from '@/app/roadmap/_content/backend/_components/NotificationStrategies';

import { Topic } from '@/app/roadmap/_components/layout/Topic';

/**
 * Shared MDX components mapping.
 * These components can be used directly inside our .mdx files.
 */
export const mdxComponents = {
  // Layout components
  Topic,
  h1: (props: any) => <h1 className="text-3xl font-black uppercase tracking-tight mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-black uppercase tracking-widest mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold uppercase tracking-wider mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4 text-slate-700 dark:text-slate-400" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg text-slate-700 dark:text-slate-400" {...props} />,
  strong: (props: any) => <strong className="font-bold text-slate-900 dark:text-slate-200" {...props} />,
  
  // Custom Roadmap Widgets
  AsyncDecisionFlowchart,
  ThreadsVsCoroutines,
  EventLoopStepper,
  NotificationStrategies,
  
  // Add more widgets as needed
};
