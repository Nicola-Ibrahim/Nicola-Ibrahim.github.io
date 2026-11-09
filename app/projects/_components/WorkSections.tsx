import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../_content/data';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-dark-lighter scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-readable text-xs font-bold tracking-widest uppercase mb-6">Selected work</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-gray-400 max-w-xl">Software projects exploring backend systems, optimization, and AI.</p>
        </div>
        <div className="space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <article key={project.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center" aria-labelledby={`project-${index}`}>
              <div className="browser-frame aspect-video">
                {project.image ? (
                  <Image src={project.image} alt={`${project.title} project interface`} width={800} height={450} loading={index === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-primary/10 via-dark-lighter to-secondary/10 p-6 text-center" aria-hidden="true">
                    <i className={`${project.icon} text-5xl md:text-6xl text-primary`} />
                    <span className="text-xl md:text-3xl font-bold text-white">{project.title}</span>
                    {project.note && <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">{project.note}</span>}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold tracking-[0.2em] text-readable uppercase mb-4 block">{project.category}</span>
                <h2 id={`project-${index}`} className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{project.title}</h2>
                {project.note && <p className="mb-4 text-sm font-semibold text-gray-300">{project.note}</p>}
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map(tag => <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">{tag}</span>)}
                </div>
                {(project.caseStudyUrl || project.demoUrl) && <div className="flex flex-wrap gap-3">
                  {project.caseStudyUrl && <Link href={project.caseStudyUrl} className="btn-primary inline-flex items-center">About the project <i className="fas fa-arrow-right ml-3 text-sm" aria-hidden="true" /></Link>}
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">Live demo <i className="fas fa-external-link-alt ml-3 text-sm" aria-hidden="true" /></a>}
                </div>}
                {project.githubUrls.length > 0 && <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                  {project.githubUrls.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><i className="fab fa-github mr-2" aria-hidden="true" />{link.label === 'Repository' ? 'View code' : `${link.label} code`}</a>)}
                </div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
