"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';
import programKids from '@/assets/program-kids.jpg';
import facilityImage from '@/assets/facility.jpg';

const imageMap: Record<number, StaticImageData> = {
  1: programKids,
  2: facilityImage,
  3: programKids,
  4: facilityImage,
  5: programKids,
};

const BlogPage3 = () => {
  const { getBlogPosts, getSeo } = useContentStore();
  const posts = getBlogPosts();
  const seo = getSeo('blog');

  return (
    <Layout3>

      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/blog"
      />
      
      <PageHero
        title="OUR BLOG"
        highlightedWord="BLOG"
        description="Insights and tips from our martial arts experts"
        backgroundImage={heroImage}
      />

      {/* Blog Posts */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {posts[0] && (
            <Link 
              href={`/template-3/blog/${posts[0].slug}`}
              className="group block mb-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center bg-muted border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-colors">
                <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden relative">
                  <Image 
                    src={imageMap[posts[0].id] || programKids}
                    fill
                    alt={posts[0].title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      {posts[0].category}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {posts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{posts[0].excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}
          
          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Link 
                href={`/template-3/blog/${post.slug}`}
                key={post.id}
                className="group block bg-muted border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="aspect-video overflow-hidden relative">
                  <Image 
                    src={imageMap[post.id] || programKids}
                    fill
                    alt={post.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default BlogPage3;
