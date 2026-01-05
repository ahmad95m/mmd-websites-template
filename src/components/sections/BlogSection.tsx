"use client";
import Link from "next/link";
import Image, { StaticImageData } from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import type { BlogPost } from '@/types/content';

// Image mapping for blog posts
import programKids from '@/assets/program-kids.jpg';
import facility from '@/assets/facility.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programAdults from '@/assets/program-adults.jpg';
import programTeens from '@/assets/program-teens.jpg';

const imageMap: Record<number, StaticImageData> = {
  1: programKids,
  2: facility,
  3: programWarriors,
  4: programAdults,
  5: programTeens,
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const imageUrl = imageMap[post.id] || programKids;
  
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className={`group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'h-48 md:h-full' : 'h-48'}`}>
        <Image
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          placeholder="blur"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h3 className={`font-heading text-foreground group-hover:text-primary transition-colors ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-primary font-semibold mt-4">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export const BlogSection = () => {
  const { getBlogPosts } = useContentStore();
  const posts = getBlogPosts();
  
  // Get featured posts first, then fill with others
  const featuredPosts = posts.filter(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);
  const displayPosts = [...featuredPosts, ...regularPosts].slice(0, 3);
  
  if (displayPosts.length === 0) return null;
  
  return (
    <Section background="default" id="blog">
      <SectionHeader
        pretitle="LATEST INSIGHTS"
        title="FROM OUR BLOG"
        description="Expert tips, training advice, and stories from our martial arts community."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        {displayPosts.map((post, index) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            featured={index === 0}
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog" className="flex items-center gap-2">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
};
