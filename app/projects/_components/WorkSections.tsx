import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../_content/data';

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-grid-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">Areas of work</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Specialized Services &amp; Solutions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">The work covers backend development, data integration, and deployment, from the first API to a running service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8">
            <i className="fas fa-server text-3xl text-primary mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">Backend Systems</h3>
            <p className="text-gray-400 leading-relaxed">APIs, data flows, and services with clear interfaces and maintainable code.</p>
          </div>
          <div className="glass-card p-8">
            <i className="fas fa-brain text-3xl text-secondary mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">ML &amp; AI Integration</h3>
            <p className="text-gray-400 leading-relaxed">Models and AI tools connected to applications, with attention to input data and useful outputs.</p>
          </div>
          <div className="glass-card p-8">
            <i className="fas fa-cloud-arrow-up text-3xl text-accent mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">Cloud &amp; Automation</h3>
            <p className="text-gray-400 leading-relaxed">Containerized services and deployment pipelines for repeatable releases.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);
  return (
    <section id="projects" className="py-24 bg-dark-lighter scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">Selected work</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{projects.length > 1 ? 'Featured Projects' : 'Featured Project'}</h1>
          <p className="text-gray-400 max-w-xl">A closer look at a project and the problem behind it.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="browser-frame aspect-video">
            {featuredProject.image && <Image src={featuredProject.image} alt="Tracing Objectives Backwards project interface" width={800} height={450} loading="eager" className="w-full h-full object-cover" />}
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">{featuredProject.category}</span>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{featuredProject.title}</h3>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">{featuredProject.description}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {featuredProject.tags.map(tag => <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">{tag}</span>)}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={featuredProject.caseStudyUrl} className="btn-primary inline-flex items-center">About the project <i className="fas fa-arrow-right ml-3 text-sm" aria-hidden="true" /></Link>
              {featuredProject.demoUrl && <a href={featuredProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">Live demo <i className="fas fa-external-link-alt ml-3 text-sm" aria-hidden="true" /></a>}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
              {featuredProject.githubUrls.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><i className="fab fa-github mr-2" aria-hidden="true" />{link.label} code</a>)}
            </div>
          </div>
        </div>
        {otherProjects.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {otherProjects.map(project => (
            <article key={project.title} className="glass-card p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <i className={`${project.icon} text-3xl text-secondary`} aria-hidden="true" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{project.note}</span>
              </div>
              <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3">{project.category}</p>
              <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">{tag}</span>)}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-auto">
                <Link href={project.caseStudyUrl} className="font-semibold text-primary hover:text-secondary">About the project <i className="fas fa-arrow-right ml-1 text-xs" aria-hidden="true" /></Link>
                {project.githubUrls.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white"><i className="fab fa-github mr-2" aria-hidden="true" />Code</a>)}
              </div>
            </article>
          ))}
        </div>}
      </div>
    </section>
  );
}
