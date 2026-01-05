"use client";
;
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { Calendar, Clock, ArrowLeft, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';

import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';
import facilityImage from '@/assets/facility.jpg';
import heroImage from '@/assets/hero-home.jpg';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPostBySlug, getBlogPosts } = useContentStore();
  const post = getBlogPostBySlug(slug || '');
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  // Import images dynamically
  const getPostImage = (imagePath: string): StaticImageData => {
    if (imagePath.includes('program-kids')) return programKids;
    if (imagePath.includes('program-warriors')) return programWarriors;
    if (imagePath.includes('program-teens')) return programTeens;
    if (imagePath.includes('program-adults')) return programAdults;
    if (imagePath.includes('facility')) return facilityImage;
    return heroImage;
  };

  if (!post) {
    return (
      <Layout>
        <SEOHead
          canonicalUrl="https://apexmartialarts.com/blog"
        />
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {`The article you're looking for doesn't exist or has been removed.`}
            </p>
            <Button variant="cta" asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </Section>
      </Layout>
    );
  }

  const canonicalUrl = `https://apexmartialarts.com/blog/${post.slug}`;
  const shareUrl = canonicalUrl;

  return (
    <Layout>
      <SEOHead
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Blog', url: 'https://apexmartialarts.com/blog' },
          { name: post.title, url: canonicalUrl }
        ]}
        article={{
          title: post.title,
          description: post.excerpt,
          author: post.author,
          datePublished: post.date,
          image: getPostImage(post.image).src // SEOHead expects string URL/path
        }}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <Image
          src={getPostImage(post.image)}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
          
          <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            {post.category}
          </span>
          
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-6 max-w-4xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" aria-hidden="true" />
              {post.author}
            </span>
            <time className="flex items-center gap-2" dateTime={post.date}>
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}
            </time>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg relative">
              <Image 
                src={getPostImage(post.image)}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <div className="text-foreground leading-relaxed space-y-4">
                <p>{post.content}</p>
                
                <h2 className="font-heading text-3xl text-foreground mt-8 mb-4">
                  Why This Matters
                </h2>
                <p>
                  {`At APEX Martial Arts Academy, we've seen firsthand how martial arts transforms lives. 
                  Whether you're looking to build confidence, improve fitness, or develop self-defense skills, 
                  the journey starts with a single step.`}
                </p>
                
                <h2 className="font-heading text-3xl text-foreground mt-8 mb-4">
                  Getting Started
                </h2>
                <p>
                  Ready to experience the benefits of martial arts for yourself or your child? 
                  We invite you to schedule a free introductory class and see why families across 
                  Chandler choose APEX Martial Arts Academy.
                </p>
                
                <aside className="bg-muted rounded-xl p-6 my-8">
                  <h3 className="font-heading text-2xl text-foreground mb-3">Key Takeaways</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                      <span>Martial arts provides physical and mental benefits for all ages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                      <span>Consistent practice leads to lasting character development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                      <span>Our programs are designed for students of all skill levels</span>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
            
            {/* Share */}
            <div className="border-t border-border pt-8 mt-8">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="w-5 h-5" aria-hidden="true" />
                  Share this article:
                </span>
                <div className="flex gap-2">
                  <a 
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside>
            <div className="sticky top-32 space-y-8">
              {/* Author Card */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-heading text-xl text-foreground mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted-foreground">APEX Martial Arts</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our instructors share their expertise and insights to help students and parents 
                  make the most of their martial arts journey.
                </p>
              </div>
              
              {/* Related Posts */}
              <nav className="bg-card rounded-2xl p-6 shadow-card" aria-label="Related articles">
                <h3 className="font-heading text-xl text-foreground mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <article className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image 
                            src={getPostImage(relatedPost.image)}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedPost.readTime}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </nav>
              
              {/* CTA */}
              <div className="bg-primary rounded-2xl p-6 text-center">
                <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                  Ready to Start?
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Schedule your free introductory class today!
                </p>
                <Button variant="secondary" size="lg" asChild className="w-full">
                  <Link href="/schedule">Book Free Class</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CTASection />
    </Layout>
  );
};

export { BlogDetailPage };
