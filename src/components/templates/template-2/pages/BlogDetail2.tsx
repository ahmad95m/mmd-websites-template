"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { ArrowLeft } from 'lucide-react';
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

const BlogDetail2 = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { getBlogPosts } = useContentStore();
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);
  
  // Handle redirect if post not found
  useEffect(() => {
    if (!post) {
      router.replace('/template-2/blog');
    }
  }, [post, router]);

  if (!post) {
    return null;
  }
  
  const image = imageMap[post.id] || programKids;

  return (
    <Layout2>
      <SEOHead
        canonicalUrl={`https://apexmartialarts.com/template-2/blog/${post.slug}`}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-end">
        <Image
          src={image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
          <Link 
            href="/template-2/blog"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm tracking-widest mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO BLOG
          </Link>
          <div className="flex items-center gap-4 text-xs text-primary-foreground/70 tracking-widest mb-4">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-light text-primary-foreground leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12 pb-12 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed text-lg mb-6">
              {post.excerpt}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default BlogDetail2;
