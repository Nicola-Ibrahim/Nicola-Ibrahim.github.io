import ParticleSphereCanvas from './ParticleSphereCanvas';

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">My background</span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">A little about <span className="text-primary">me</span></h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Backend engineering is the main focus: APIs, data flows, and services built for practical use. The work also includes connecting models and AI tools to applications, from preparing inputs to handling results.
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
  );
}

export function EducationSection() {
  return (
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
          <h2 className="text-3xl font-bold mb-8"><i className="fas fa-quote-left text-secondary mr-4" aria-hidden="true" />From a collaborator</h2>
          <blockquote className="glass-card">
            <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">“Nicola is a brilliant engineer who quickly grasped our complex requirements and delivered a scalable solution.”</p>
            <footer><strong className="text-white">Raphael Meyer-Alten</strong><span className="block text-sm text-gray-500">CEO at Choyze Company</span></footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
