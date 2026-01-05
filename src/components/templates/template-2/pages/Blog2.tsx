"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { ArrowRight } from 'lucide-react';
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

const BlogPage2 = () => {
  const { getBlogPosts, getSeo } = useContentStore();
  const posts = getBlogPosts();
  const seo = getSeo('blog');

  return (
    <Layout2>

      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/blog"
      />
      
      <PageHero
        title="OUR BLOG"
        highlightedWord="BLOG"
        description="Insights and tips from our martial arts experts"
        backgroundImage={heroImage}
      />

      {/* Blog Posts */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            {posts.map((post, index) => {
              const isEven = index % 2 === 0;
              const image = imageMap[post.id] || programKids;
              
              return (
                <article 
                  key={post.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center`}
                >
                  <div className={`aspect-[16/10] overflow-hidden relative ${!isEven ? 'lg:order-2' : ''}`}>
                    <Image 
                      src={image}
                      fill
                      alt={post.title}
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-widest mb-4">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-light text-foreground mb-4">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/template-2/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-foreground tracking-widest text-sm uppercase hover:text-primary transition-colors group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default BlogPage2;
