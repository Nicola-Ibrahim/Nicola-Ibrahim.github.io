export function AreasOfWorkSection() {
  return (
    <section id="areas-of-work" className="py-24 bg-grid-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-readable text-xs font-bold tracking-widest uppercase mb-6">Engineering focus</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Areas of work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Backend development, data and AI integration, and deployment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8">
            <i className="fas fa-server text-3xl text-primary mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">Backend systems</h3>
            <p className="text-gray-400 leading-relaxed">APIs, data flows, and services built with clear interfaces and maintainable code.</p>
          </div>
          <div className="glass-card p-8">
            <i className="fas fa-brain text-3xl text-secondary mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">ML &amp; AI integration</h3>
            <p className="text-gray-400 leading-relaxed">Connecting models and AI tools to applications, with attention to input data, evaluation, and useful outputs.</p>
          </div>
          <div className="glass-card p-8">
            <i className="fas fa-cloud-arrow-up text-3xl text-accent mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white mb-4">Cloud &amp; automation</h3>
            <p className="text-gray-400 leading-relaxed">Containerized services and deployment pipelines for repeatable releases.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
