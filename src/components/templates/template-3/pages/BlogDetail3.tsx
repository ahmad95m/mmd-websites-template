"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import programKids from '@/assets/program-kids.jpg';
import facilityImage from '@/assets/facility.jpg';
import { useEffect } from 'react';

const imageMap: Record<number, StaticImageData> = {
  1: programKids,
  2: facilityImage,
  3: programKids,
  4: facilityImage,
  5: programKids,
};

const BlogDetail3 = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { getBlogPosts } = useContentStore();
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);
  
  useEffect(() => {
    if (!post) {
      router.replace('/template-3/blog');
    }
  }, [post, router]);

  if (!post) {
    return null;
  }
  

  const image = imageMap[post.id] || programKids;


  return (
    <Layout3>
      <SEOHead
        canonicalUrl={`https://apexmartialarts.com/template-3/blog/${post.slug}`}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link 
            href="/template-3/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              {post.category}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author */}
          <div className="flex items-center gap-4 mb-12 pb-12 border-b border-border">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-secondary-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-foreground/80 text-xl leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default BlogDetail3;