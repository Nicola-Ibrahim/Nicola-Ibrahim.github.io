import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectContent, getAllProjectSlugs } from '../_lib/mdx';
import { ArchitectureDiagram } from '../_components/mdx/ArchitectureDiagram';
import TraceEngineDiagram from '../_components/diagrams/TraceEngineDiagram';
import BotSystemDiagram from '../_components/diagrams/BotSystemDiagram';
import IAMServiceDiagram from '../_components/diagrams/IAMServiceDiagram';

const components = {
  ArchitectureDiagram,
  TraceEngineDiagram,
  BotSystemDiagram,
  IAMServiceDiagram,
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight" {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6 tracking-tight border-l-4 border-primary pl-6" {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <h3 className="text-xl font-bold text-slate-200 mt-10 mb-4 tracking-wide" {...props} />,
  p: (props: React.ComponentPropsWithoutRef<'p'>) => <p className="text-lg leading-relaxed text-slate-400 mb-6" {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc pl-6 mb-8 space-y-3 text-slate-400" {...props} />,
  li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="text-lg leading-relaxed" {...props} />,
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold text-white" {...props} />,
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => <blockquote className="border-l-4 border-secondary pl-6 italic text-slate-300 my-8" {...props} />,
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectContent(slug);
  if (!project) return { title: 'Project Not Found' };

  const title = `${project.frontmatter.title} | Project`;
  const description = project.frontmatter.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://nicolaibrahim.github.io/projects/${slug}`,
      publishedTime: project.frontmatter.date,
      authors: ['Nicola Ibrahim'],
      tags: project.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProjectContent(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-none">
      <header className="mb-20">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
          {project.frontmatter.category}
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
          {project.frontmatter.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed mb-12">
          {project.frontmatter.description}
        </p>
      </header>

      <div className="max-w-none">
        <MDXRemote source={project.source} components={components} />
      </div>


    </article>
  );
}
