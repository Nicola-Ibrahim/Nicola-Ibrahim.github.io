'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { skills, projects } from '@/content/data';
import HeroCanvas from '@/components/home/HeroCanvas';
import AboutCanvas from '@/components/home/AboutCanvas';
import TiltWrapper from '@/components/ui/TiltWrapper';
import TypingAnimation from '@/components/ui/TypingAnimation';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('backend');

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

  const filteredSkills = skills.filter(skill => skill.category === activeFilter);

  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-float"></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-float"
          style={{ animationDelay: '-3s' }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-2xl font-heading font-bold tracking-tighter hover:text-primary transition-colors">
              NI<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link text-sm font-medium tracking-wide">HOME</a>
              <a href="#about" className="nav-link text-sm font-medium tracking-wide">ABOUT</a>
              <a href="#services" className="nav-link text-sm font-medium tracking-wide">SERVICES</a>
              <a href="#tools" className="nav-link text-sm font-medium tracking-wide">TOOLS</a>
              <a href="#projects" className="nav-link text-sm font-medium tracking-wide">PROJECTS</a>
              <a href="#education" className="nav-link text-sm font-medium tracking-wide">EDUCATION</a>
              <Link href="/roadmap" className="nav-link text-sm font-medium tracking-wide border-l-2 border-white/10 pl-8 ml-2 text-indigo-400">ROADMAP</Link>
              <a href="#contact" className="btn-primary text-sm py-2 px-6">LET'S TALK</a>
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
          <Link href="/roadmap" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-indigo-400">Roadmap</Link>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-primary">Let's Talk</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <HeroCanvas />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Nicola Ibrahim</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
              A <TypingAnimation text="Backend & AI Engineer" /> crafting robust systems and intelligent solutions.
            </p>
            <div className="flex items-center justify-center">
              <a href="#projects" className="btn-primary group">
                View Work <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>
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
            <div data-aos="fade-right">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                Crafting <span className="text-primary">Backend & AI</span> Excellence
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                I am a passionate Backend & AI Engineer with a focus on building robust, scalable systems and intelligent solutions. I bridge the gap between complex architectural requirements and elegant, performant code.
              </p>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                My goal is to design architectures that not only solve immediate problems but also provide a foundation for long-term growth and innovation. Whether it's optimizing a high-traffic API or implementing a sophisticated ML model, I thrive on tackling challenges that push the boundaries of what's possible.
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
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="aspect-square rounded-3xl overflow-hidden relative group">
                <AboutCanvas />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div data-aos="fade-up" className="mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              What I Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Specialized Services & Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              From initial concept to production-ready systems — I build fast, beautiful, and scalable digital products tailored to complex requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Backend Engineering", icon: "fa-server", color: "primary", text: "Designing high-performance, scalable server architectures and robust REST APIs." },
              { title: "AI & Machine Learning", icon: "fa-brain", color: "secondary", text: "Integrating intelligent features and training custom models to solve complex data problems." },
              { title: "Software Architecture", icon: "fa-cubes", color: "accent", text: "Applying Domain-Driven Design (DDD) to create modular, maintainable systems." }
            ].map((service, idx) => (
              <TiltWrapper key={idx} className="h-full">
                <div className="glass-card flex flex-col items-center p-10 text-center group h-full" data-aos="fade-up" data-aos-delay={100 * (idx + 1)}>
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-${service.color}/50 transition-colors`}>
                    <i className={`fas ${service.icon} text-3xl text-${service.color}`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.text}</p>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-grid-dark relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Toolbox</h2>
            <p className="text-gray-400 max-w-xl mx-auto">The technologies I use to bring ideas to life.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
            {['backend', 'frontend', 'data-ai', 'devops-cloud', 'database', 'other-skills'].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`skill-tab uppercase ${activeFilter === filter ? 'active' : ''}`}
              >
                {filter.replace('-', ' & ')}
              </button>
            ))}
          </div>

          <div id="skills-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" data-aos="fade-up" data-aos-delay="200">
            {filteredSkills.map((skill, idx) => (
              <TiltWrapper key={idx}>
                <div className="skill-card glass-card flex flex-col items-center justify-center text-center group">
                  <i 
                    className={`${skill.icon} text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`} 
                    style={{ color: skill.color }}
                  ></i>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-dark-lighter relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-xl">A selection of Projects that reflect how I build and think.</p>
          </div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <div key={idx} className="relative group" data-aos="fade-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className={`order-2 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    <div className={`absolute -inset-4 bg-${project.highlightColor}/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    <div className="browser-frame transform transition-transform duration-700 group-hover:scale-[1.02] aspect-video flex flex-col">
                      <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-white/5">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <i className={`${project.icon} text-7xl md:text-9xl text-white/20 group-hover:text-${project.highlightColor} transition-colors duration-500`}></i>
                        )}
                        <div className="light-sweep"></div>
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
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" className="btn-outline inline-flex items-center">
                          Live Demo <i className="fas fa-external-link-alt ml-3 text-sm"></i>
                        </a>
                      )}
                      <a href={project.githubUrl} target="_blank" className="btn-primary inline-flex items-center">
                        GitHub Code <i className="fab fa-github ml-3 text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section CTA */}
      <section id="roadmap-cta" className="py-24 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-indigo-500/50 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-dark-lighter border border-white/10 rounded-3xl p-10 md:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div data-aos="fade-right">
                  <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                    Learning & Development
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Technical <span className="text-primary">Study</span> Roadmaps
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                    I believe in transparency and continuous learning. Explore my personal interactive study guides for AI Agents, Algorithms, DevOps, and Backend Architecture.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/roadmap" className="btn-primary flex items-center gap-2 group">
                      Explore Academy <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
                  {[
                    { title: "AI & Agents", icon: "fa-robot", count: "12 Skills" },
                    { title: "Algorithms", icon: "fa-project-diagram", count: "40+ Topics" },
                    { title: "DevOps", icon: "fa-terminal", count: "7 Modules" },
                    { title: "Network", icon: "fa-network-wired", count: "OSI Focus" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                      <i className={`fas ${item.icon} text-primary text-xl mb-4`}></i>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div data-aos="fade-right">
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
            </div>
            <div data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <i className="fas fa-quote-left text-secondary mr-4"></i> Testimonials
              </h2>
              <TiltWrapper>
                <div className="glass-card relative">
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
                </div>
              </TiltWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" data-aos="zoom-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Launch?</h2>
          <p className="text-xl text-gray-400 mb-10">Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:nicolaibrahim969@gmail.com" className="btn-primary text-lg px-10 py-4">
              <i className="fas fa-envelope mr-2"></i> Say Hello
            </a>
            <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" className="btn-outline text-lg px-10 py-4">
              <i className="fab fa-linkedin mr-2"></i> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/10 bg-dark-lighter">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gradient text-2xl font-semibold">Nicola Ibrahim</p>
              <p className="text-gray-500 text-sm">Backend engineer building scalable systems.</p>
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

    </>
  );
}
