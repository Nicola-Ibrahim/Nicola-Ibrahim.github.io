'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, skillGroups } from './_content/data';
import BlackholeCanvas from './_components/BlackholeCanvas';
import ParticleSphereCanvas from './_components/ParticleSphereCanvas';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#tools' },
  { label: 'Contact', href: '#contact' },
];

export default function PortfolioPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="dark text-light min-h-screen">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-md" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <a href="#home" className="text-2xl font-heading font-bold tracking-tighter text-white hover:text-primary transition-colors" aria-label="Nicola Ibrahim, back to top">
            NI<span className="text-primary">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navigation.map(({ label, href }) => (
              <a key={href} href={href} className="nav-link text-sm font-bold tracking-wide uppercase">{label}</a>
            ))}
          </div>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-white"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </div>
        <div id="mobile-menu" className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col gap-4 border-t border-white/10 bg-dark/95 px-6 py-6`}>
          {navigation.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-primary">{label}</a>
          ))}
        </div>
      </nav>

      <main>
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <BlackholeCanvas />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.24em] text-primary mb-6">Software Engineer</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I&apos;m <br /><span className="text-gradient">Nicola Ibrahim</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              I build backend systems and integrate data and AI capabilities into practical software.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="btn-primary inline-flex items-center">View my work <i className="fas fa-arrow-right ml-3 text-sm" aria-hidden="true" /></a>
              <a href="#contact" className="btn-outline inline-flex items-center">Get in touch</a>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">About me</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">Engineering reliable <span className="text-primary">systems</span></h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                I&apos;m a software engineer focused on backend development, infrastructure, and data-driven systems. I connect models and AI services to applications through clear APIs, reliable data flows, and maintainable deployment pipelines.
              </p>
              <div className="flex flex-wrap gap-10 mt-10 pt-8 border-t border-white/10">
                <div><p className="text-3xl font-black text-primary mb-1">4+</p><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Years of experience</p></div>
                <div><p className="text-3xl font-black text-accent mb-1">M.Sc.</p><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Computer Engineering</p></div>
              </div>
            </div>
            <div className="relative aspect-square max-w-lg w-full mx-auto rounded-3xl overflow-hidden" aria-hidden="true">
              <ParticleSphereCanvas />
            </div>
          </div>
        </section>

        <section id="services" className="py-24 bg-grid-dark scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">What I do</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Specialized Services &amp; Solutions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">I bring backend engineering, data work, and delivery together so an idea can become a usable system.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8">
                <i className="fas fa-server text-3xl text-primary mb-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-4">Backend Systems</h3>
                <p className="text-gray-400 leading-relaxed">Designing APIs, data flows, and maintainable service architecture.</p>
              </div>
              <div className="glass-card p-8">
                <i className="fas fa-brain text-3xl text-secondary mb-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-4">ML &amp; AI Integration</h3>
                <p className="text-gray-400 leading-relaxed">Connecting data-driven methods and AI providers to software through stable interfaces and clear outputs.</p>
              </div>
              <div className="glass-card p-8">
                <i className="fas fa-cloud-arrow-up text-3xl text-accent mb-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-4">Cloud &amp; Automation</h3>
                <p className="text-gray-400 leading-relaxed">Containerizing services and building delivery pipelines that make deployments repeatable.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 bg-dark-lighter scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-14">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">Selected work</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{projects.length > 1 ? 'Featured Projects' : 'Featured Project'}</h2>
              <p className="text-gray-400 max-w-xl">Backend, data-driven engineering, and AI integration in practice.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="browser-frame aspect-video">
                {featuredProject.image && <Image src={featuredProject.image} alt="Tracing Objectives Backwards project interface" width={800} height={450} className="w-full h-full object-cover" />}
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">{featuredProject.category}</span>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{featuredProject.title}</h3>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {featuredProject.tags.map(tag => <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">{tag}</span>)}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={featuredProject.caseStudyUrl} className="btn-primary inline-flex items-center">Read case study <i className="fas fa-arrow-right ml-3 text-sm" aria-hidden="true" /></Link>
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
                    <Link href={project.caseStudyUrl} className="font-semibold text-primary hover:text-secondary">Read case study <i className="fas fa-arrow-right ml-1 text-xs" aria-hidden="true" /></Link>
                    {project.githubUrls.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white"><i className="fab fa-github mr-2" aria-hidden="true" />Code</a>)}
                  </div>
                </article>
              ))}
            </div>}
          </div>
        </section>

        <section id="tools" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Toolbox</h2>
            <p className="text-gray-400 max-w-2xl mb-12">Tools and practices I use to build applications, work with data, and deliver them reliably.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map(group => (
                <div key={group.title} className="glass-card p-7">
                  <h3 className="text-xl font-bold text-white mb-5">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span key={skill.name} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
                        <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true" />{skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8"><i className="fas fa-graduation-cap text-primary mr-4" aria-hidden="true" />Education</h2>
              <p className="text-sm text-primary font-medium mb-1">2023 – 2026</p>
              <h3 className="text-xl font-bold">M.Sc. Computer Engineering</h3>
              <p className="text-gray-400">Paderborn University, Germany</p>
              <p className="text-gray-500 mt-2 text-sm">Thesis: Tracing the Objectives Backwards</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8"><i className="fas fa-quote-left text-secondary mr-4" aria-hidden="true" />What others say</h2>
              <blockquote className="glass-card">
                <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">“Nicola is a brilliant engineer who quickly grasped our complex requirements and delivered a scalable solution.”</p>
                <footer><strong className="text-white">Raphael Meyer-Alten</strong><span className="block text-sm text-gray-500">CEO at Choyze Company</span></footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 relative scroll-mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Let&apos;s connect</h2>
            <p className="text-xl text-gray-400 mb-10">Have a project or a question? Send me a message.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:nicolaibrahim969@gmail.com" className="btn-primary inline-flex items-center">Email me <i className="fas fa-paper-plane ml-3 text-sm" aria-hidden="true" /></a>
              <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-gradient text-2xl font-semibold">Nicola Ibrahim</p>
            <p className="text-gray-500 text-sm">Software engineer building reliable systems.</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/roadmap" className="text-gray-400 hover:text-white">Roadmap</Link>
            <a href="https://github.com/Nicola-Ibrahim" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white"><i className="fab fa-github text-xl" aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin text-xl" aria-hidden="true" /></a>
          </div>
        </div>
        <p className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nicola Ibrahim. All rights reserved.</p>
      </footer>
    </div>
  );
}
