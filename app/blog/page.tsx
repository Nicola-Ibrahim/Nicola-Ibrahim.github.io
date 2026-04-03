import React from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';

export const metadata = {
  title: "Blog | Nicola Ibrahim",
  description: "Insights on Backend Engineering, AI, and Software Architecture.",
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-dark pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16" data-aos="fade-up">
            <Link href="/" className="text-primary hover:text-white transition-colors mb-8 inline-block">
                <i className="fas fa-arrow-left mr-2"></i> Back to Portfolio
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                The <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-gray-400 font-light">
                Deep dives into technical architecture, AI implementation, and scalable systems.
            </p>
        </header>

        <div className="grid gap-12">
            {allPostsData.length > 0 ? (
                allPostsData.map((post, idx) => (
                    <article key={post.slug} className="glass-card group" data-aos="fade-up" data-aos-delay={idx * 100}>
                        <Link href={`/blog/${post.slug}`} className="block">
                            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">{post.category} — {post.date}</span>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                            <span className="text-white font-bold flex items-center">
                                Read More <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </Link>
                    </article>
                ))
            ) : (
                <p className="text-gray-500 italic">No posts found yet. Check back soon!</p>
            )}
        </div>
      </div>
    </div>
  );
}
