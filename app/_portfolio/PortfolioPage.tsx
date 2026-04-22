'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { skills, projects } from './_content/data';
import BlackholeCanvas from './_components/BlackholeCanvas';
import ParticleSphereCanvas from './_components/ParticleSphereCanvas';
import TypingText from './_components/TypingText';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Animation Variants
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: 'spring', stiffness: 100, damping: 20 }
} as const;

const FADE_RIGHT = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { type: 'spring', stiffness: 100, damping: 20 }
} as const;

const FADE_LEFT = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { type: 'spring', stiffness: 100, damping: 20 }
} as const;

const ZOOM_IN = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { type: 'spring', stiffness: 100, damping: 20 }
} as const;

const STAGGER_CONTAINER = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
} as const;

export default function PortfolioPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('devops-cloud');
  const [openGithubIdx, setOpenGithubIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-white/10');
      } else {
        navbar?.classList.remove('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-white/10');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenGithubIdx(null);
    if (openGithubIdx !== null) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openGithubIdx]);

  const filteredSkills = skills.filter(skill => skill.category === activeFilter);

  return (
    <div className="dark text-light min-h-screen">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/20 blur-[120px] animate-float"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 dark:bg-secondary/20 blur-[120px] animate-float"
          style={{ animationDelay: '-3s' }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-2xl font-heading font-bold tracking-tighter hover:text-primary transition-colors text-white">
              NI<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">HOME</a>
              <a href="#about" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">ABOUT</a>
              <a href="#services" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">SERVICES</a>
              <a href="#tools" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">TOOLS</a>
              <a href="#projects" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">PROJECTS</a>
              <a href="#education" className="nav-link text-sm font-bold tracking-wide text-slate-400 hover:text-primary transition-colors">EDUCATION</a>
              <Link href="/roadmap" className="nav-link text-sm font-bold tracking-wide border-l-2 border-white/10 pl-8 ml-2 text-primary hover:text-secondary transition-colors">ROADMAP</Link>
              <div className="flex items-center gap-4 border-l-2 border-white/10 pl-8 ml-2">
                <a href="#contact" className="btn-primary text-sm py-2.5 px-6">LET'S TALK</a>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl text-white focus:outline-none"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-20 left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex-col space-y-4`}>
          {['home', 'about', 'services', 'tools', 'projects', 'education'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors capitalize">{item}</a>
          ))}
          <Link href="/roadmap" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-primary hover:text-secondary transition-colors">Roadmap</Link>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-primary">Let's Talk</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <BlackholeCanvas />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...FADE_UP} transition={{ ...FADE_UP.transition, duration: 1 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Nicola Ibrahim</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
              <TypingText text="Software Engineer" /> <br />
              Developing systems and automated infrastructure.
            </p>
            <div className="flex items-center justify-center">
              <a href="#projects" className="btn-primary group">
                View Work <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#tools" className="text-white/50 hover:text-white transition-colors">
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...FADE_RIGHT}>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                Systems & <span className="text-primary">Infrastructure</span> Engineering
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                I am a Software Engineer focused on building maintainable applications and managing robust systems. I spend my time optimizing database performance and automating the software delivery lifecycle.
              </p>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                I apply architectural patterns to solve technical constraints. I prioritize observability and system stability over speculative features.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-black text-primary mb-1">4+</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-accent mb-1">M.Sc.</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Computer Eng.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" {...FADE_LEFT}>
              <div className="aspect-square rounded-3xl overflow-hidden relative group">
                <ParticleSphereCanvas />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...FADE_UP} className="mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              What I Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Specialized Services & Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              I develop stable, performant backend services and automate cloud environments to ensure reliable software delivery.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={STAGGER_CONTAINER}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { title: "Backend Systems", icon: "fa-server", color: "primary", text: "Designing high-performance, concurrent server architectures and managing complex data flow." },
              { title: "Cloud & Automation", icon: "fa-cloud-arrow-up", color: "secondary", text: "Managing cloud environments, implementing containerization, and building robust CI/CD pipelines to accelerate and secure the deployment lifecycle." },
              { title: "Architecture & Reliability", icon: "fa-shield-halved", color: "accent", text: "Applying modular design patterns and implementing monitoring for system observability." }
            ].map((service, idx) => (
              <motion.div key={idx} className="h-full" variants={FADE_UP}>
                <div className="glass-card flex flex-col items-center p-10 text-center group h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-${service.color}/50 transition-colors`}>
                    <i className={`fas ${service.icon} text-3xl text-${service.color}`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-grid-dark relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...FADE_UP}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Toolbox</h2>
            <p className="text-gray-400 max-w-xl mx-auto">The technologies I use to bring ideas to life.</p>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-10" {...FADE_UP} transition={{ delay: 0.1 }}>
            {['devops-cloud', 'backend', 'database', 'data-ai', 'frontend', 'other-skills'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`skill-tab uppercase ${activeFilter === filter ? 'active' : ''}`}
              >
                {filter.replace('-', ' & ')}
              </button>
            ))}
          </motion.div>

          <motion.div
            id="skills-grid"
            key={activeFilter}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={STAGGER_CONTAINER}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {filteredSkills.map((skill) => (
              <motion.div key={skill.name} variants={FADE_UP}>
                <div className="skill-card glass-card flex flex-col items-center justify-center text-center group">
                  <i
                    className={`${skill.icon} text-4xl mb-4 transition-transform duration-300`}
                    style={{ color: skill.color }}
                  ></i>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-dark-lighter relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="flex flex-col items-center text-center mb-16" {...FADE_UP}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-xl">A selection of Projects that reflect how I build and think.</p>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <motion.div key={idx} className="relative group" {...FADE_UP}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className={`order-2 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    <div className="browser-frame transform transition-transform duration-700 aspect-video flex flex-col">
                      <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-white/5 group/demo">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <i className={`${project.icon} text-7xl md:text-9xl text-white/20 group-hover:text-${project.highlightColor} transition-colors duration-500`}></i>
                        )}
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            className="absolute top-4 right-4 z-20 h-10 px-3 rounded-full bg-dark/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 shadow-xl group/btn overflow-hidden"
                            title="Visit Live Demo"
                          >
                            <span className="max-w-0 overflow-hidden group-hover/btn:max-w-[100px] group-hover/btn:mr-2 transition-all duration-300 whitespace-nowrap text-[10px] font-black uppercase tracking-widest leading-none">
                              Live Demo
                            </span>
                            <i className="fas fa-external-link-alt text-xs"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`order-1 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className={`text-xs font-bold tracking-[0.2em] text-${project.highlightColor} uppercase mb-4 block`}>{project.category}</span>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{project.title}</h3>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.caseStudyUrl && (
                        <Link href={project.caseStudyUrl} className="btn-primary inline-flex items-center">
                          Read Case Study <i className="fas fa-arrow-right ml-3 text-sm"></i>
                        </Link>
                      )}
                      {project.githubUrls.length > 1 ? (
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenGithubIdx(openGithubIdx === idx ? null : idx);
                            }}
                            className={`inline-flex items-center ${project.caseStudyUrl ? 'btn-outline border-white/20 hover:border-white' : 'btn-primary'}`}
                          >
                            GitHub Code <i className="fab fa-github ml-3 text-sm"></i>
                            <i className={`fas fa-chevron-${openGithubIdx === idx ? 'up' : 'down'} ml-2 text-[10px]`}></i>
                          </button>
                          {openGithubIdx === idx && (
                            <div className="absolute top-full left-0 mt-2 py-2 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl z-20 min-w-[180px] overflow-hidden backdrop-blur-xl">
                              {project.githubUrls.map((link, lIdx) => (
                                <a 
                                  key={lIdx} 
                                  href={link.url} 
                                  target="_blank" 
                                  className="flex items-center justify-between px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group/link"
                                >
                                  {link.label}
                                  <i className="fas fa-external-link-alt text-[10px] opacity-0 group-hover/link:opacity-50 transition-opacity"></i>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <a 
                          href={project.githubUrls[0].url} 
                          target="_blank" 
                          className={`inline-flex items-center ${project.caseStudyUrl ? 'btn-outline border-white/20 hover:border-white' : 'btn-primary'}`}
                        >
                          GitHub Code <i className="fab fa-github ml-3 text-sm"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Education Section */}
      <section id="education" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...FADE_RIGHT}>
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <i className="fas fa-graduation-cap text-primary mr-4"></i> Education
              </h2>
              <div className="relative pl-8 border-l-2 border-white/10 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-dark"></div>
                  <span className="text-sm text-primary font-medium mb-1 block">2023 - 2026</span>
                  <h3 className="text-xl font-bold">M.Sc. Computer Engineering</h3>
                  <p className="text-gray-400">Paderborn University, Germany</p>
                  <p className="text-gray-500 mt-2 text-sm">
                    <span className="text-secondary font-medium">Thesis:</span> Tracing the Objectives Backwards
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div {...FADE_LEFT}>
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <i className="fas fa-quote-left text-secondary mr-4"></i> Testimonials
              </h2>
              <div>
                <motion.div className="glass-card relative" {...ZOOM_IN}>
                  <i className="fas fa-quote-right absolute top-6 right-6 text-4xl text-white/5"></i>
                  <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                    "Nicola is a brilliant engineer who quickly grasped our complex requirements and delivered a scalable solution."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">RM</div>
                    <div className="ml-4">
                      <h4 className="font-bold">Raphael Meyer-Alten</h4>
                      <p className="text-sm text-gray-500">CEO at Choyze Company</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <motion.div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" {...ZOOM_IN}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Launch?</h2>
          <p className="text-xl text-gray-400 mb-10">Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:nicolaibrahim969@gmail.com" className="btn-primary group text-lg px-10 py-4 inline-flex items-center gap-2">
              SAY HELLO <i className="fas fa-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </a>
            <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" className="btn-outline text-lg px-10 py-4">
              <i className="fab fa-linkedin mr-2"></i> LinkedIn
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 border-t border-white/10 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gradient text-2xl font-semibold">Nicola Ibrahim</p>
            <p className="text-gray-500 text-sm">Software engineer building scalable systems.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/Nicola-Ibrahim" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
            <a href="https://linkedin.com/in/nicola-ibrahim/" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Nicola Ibrahim. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
