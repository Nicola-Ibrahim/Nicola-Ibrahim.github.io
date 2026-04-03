import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostDataBySlug, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const post = getPostDataBySlug(slug);
  if (!post) return;
  return {
    title: `${post.metadata.title} | Nicola Ibrahim`,
  };
}

export default async function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = getPostDataBySlug(slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-dark pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12" data-aos="fade-up">
            <Link href="/blog" className="text-primary hover:text-white transition-colors mb-8 inline-block">
                <i className="fas fa-arrow-left mr-2"></i> All Posts
            </Link>
            <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-4">
                {post.metadata.category} — {post.metadata.date}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {post.metadata.title}
            </h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary transition-colors" data-aos="fade-up" data-aos-delay="100">
            <MDXRemote source={post.content} />
        </div>

        <footer className="mt-20 pt-12 border-t border-white/10" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-white font-bold mb-2">Written by Nicola Ibrahim</h4>
                    <p className="text-gray-400">Backend & AI Software Engineer</p>
                </div>
                <div className="flex space-x-6">
                    <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-linkedin text-2xl"></i></a>
                    <a href="https://github.com/Nicola-Ibrahim" target="_blank" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-github text-2xl"></i></a>
                </div>
            </div>
        </footer>
      </div>
    </article>
  );
}
