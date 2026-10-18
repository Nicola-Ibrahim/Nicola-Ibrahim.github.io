import React from 'react';
import Link from 'next/link';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark text-light overflow-x-hidden pt-20">
      <Link href="/projects" className="return-link return-link--page"><span aria-hidden="true">←</span> Back to Work</Link>

      <main className="max-w-5xl mx-auto px-6 py-20">
        {children}
      </main>

      <footer className="py-12 border-t border-white/10 bg-dark-lighter text-center">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nicola Ibrahim.</p>
      </footer>
    </div>
  );
}
