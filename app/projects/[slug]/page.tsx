import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectContent, getAllProjectSlugs } from '../_lib/mdx';
import { Badge } from '../_components/mdx/Badge';
import { ArchitectureDiagram } from '../_components/mdx/ArchitectureDiagram';
import TraceEngineDiagram from '../_components/diagrams/TraceEngineDiagram';
import BotSystemDiagram from '../_components/diagrams/BotSystemDiagram';
import IAMServiceDiagram from '../_components/diagrams/IAMServiceDiagram';

// Component registry for MDX
const components = {
  Badge,
  ArchitectureDiagram,
  TraceEngineDiagram,
  BotSystemDiagram,
  IAMServiceDiagram,
  h1: (props: any) => <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6 tracking-tight border-l-4 border-primary pl-6" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold text-slate-200 mt-10 mb-4 tracking-wide" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed text-slate-400 mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-slate-400" {...props} />,
  li: (props: any) => <li className="text-lg leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-secondary pl-6 italic text-slate-300 my-8" {...props} />,
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

  return {
    title: `${project.frontmatter.title} | Engineering Case Study`,
    description: project.frontmatter.description,
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
          Case Study: {project.frontmatter.category}
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
          {project.frontmatter.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed mb-12">
          {project.frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 pr-6 border-r border-white/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">NI</div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Nicola Ibrahim</p>
              <p className="text-[10px] text-gray-500 uppercase">Backend Engineer</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{project.frontmatter.date}</p>
        </div>
      </header>

      <div className="max-w-none">
        <MDXRemote source={project.source} components={components} />
      </div>

      <section className="mt-30 pt-20 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Discuss this architecture?</h2>
        <a href="mailto:nicolaibrahim969@gmail.com" className="btn-primary px-12 py-4">
          GET IN TOUCH
        </a>
      </section>
    </article>
  );
}
