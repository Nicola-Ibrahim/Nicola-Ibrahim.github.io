export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Want to talk?</h1>
        <p className="text-xl text-gray-400 mb-10">For a project idea or a question about the work, send a note or connect on LinkedIn.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:nicolaibrahim969@gmail.com" className="btn-primary inline-flex items-center">Send an email <i className="fas fa-paper-plane ml-3 text-sm" aria-hidden="true" /></a>
          <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
