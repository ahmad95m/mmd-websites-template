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
import { useAdminStore } from '@/admin/store/useAdminStore';
import { AdminOverlay } from '@/admin/components/AdminOverlay';
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
  const { draftContent, isAuthenticated } = useAdminStore();
  const { getBlogPostBySlug, getBlogPosts, getCta } = useContentStore();

  const cta = isAuthenticated ? draftContent.cta : getCta();
  
  // Resolve post: If admin is logged in, look in draft content. Otherwise use public content.
  let post = getBlogPostBySlug(slug || '');
  let postIndex = -1;

  if (isAuthenticated && draftContent.blog) {
    postIndex = draftContent.blog.findIndex(p => p.slug === slug);
    if (postIndex !== -1) {
      post = draftContent.blog[postIndex];
    }
  }

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
      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <AdminOverlay
           path={`blog[${postIndex}].image`}
           label="Hero Image"
           type="image"
           value={post.image}
           className="absolute inset-0 z-0"
        >
          <Image
            src={getPostImage(post.image)}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </AdminOverlay>
        <div className="absolute inset-0 bg-secondary/90 pointer-events-none" />
        <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
          
          <AdminOverlay path={`blog[${postIndex}].category`} label="Category" value={post.category} className="inline-block mb-4">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </AdminOverlay>
          
          <AdminOverlay path={`blog[${postIndex}].title`} label="Title" value={post.title} className="mb-6">
            <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground max-w-4xl">
              {post.title}
            </h1>
          </AdminOverlay>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
            <AdminOverlay path={`blog[${postIndex}].author`} label="Author" value={post.author} className="flex">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                {post.author}
              </span>
            </AdminOverlay>
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
              
              <AdminOverlay 
                path={`blog[${postIndex}].content`} 
                label="Content" 
                type="rich-text" 
                value={post.content}
              >
                <div 
                  className="text-foreground leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </AdminOverlay>
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
                    <AdminOverlay path={`blog[${postIndex}].author`} label="Author Name" value={post.author}>
                      <p className="font-semibold text-foreground">{post.author}</p>
                    </AdminOverlay>
                    <AdminOverlay path={`blog[${postIndex}].authorTitle`} label="Author Title" value={post.authorTitle || "APEX Martial Arts"}>
                      <p className="text-sm text-muted-foreground">{post.authorTitle || "APEX Martial Arts"}</p>
                    </AdminOverlay>
                  </div>
                </div>
                <AdminOverlay 
                  path={`blog[${postIndex}].authorBio`} 
                  label="Author Bio" 
                  type="textarea" 
                  value={post.authorBio || "Our instructors share their expertise and insights to help students and parents make the most of their martial arts journey."}
                >
                  <p className="text-sm text-muted-foreground">
                    {post.authorBio || "Our instructors share their expertise and insights to help students and parents make the most of their martial arts journey."}
                  </p>
                </AdminOverlay>
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
                <AdminOverlay path="cta.title" label="CTA Title" value={cta?.title} className="mb-3">
                  <h3 className="font-heading text-2xl text-primary-foreground">
                    {cta?.title || "Ready to Start?"}
                  </h3>
                </AdminOverlay>
                <AdminOverlay path="cta.description" label="CTA Description" type="textarea" value={cta?.description} className="mb-4">
                  <p className="text-primary-foreground/80 text-sm">
                    {cta?.description || "Schedule your free introductory class today!"}
                  </p>
                </AdminOverlay>
                <AdminOverlay path="cta.buttonText" label="Button Text" value={cta?.buttonText} className="w-full">
                  <Button variant="secondary" size="lg" asChild className="w-full pointer-events-none">
                    <span>{cta?.buttonText || "Book Free Class"}</span>
                  </Button>
                </AdminOverlay>
                {/* Visual only link for the button when not editing */}
                {!isAuthenticated && (
                  <Link href="/schedule" className="absolute inset-x-6 bottom-6 h-11" aria-hidden="true" />
                )}
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
