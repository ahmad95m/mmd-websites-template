"use client";
import Link from 'next/link';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { useContentStore } from '@/store/useContentStore';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const BlogPage = () => {
  const { getBlogPosts, getFeaturedPosts } = useContentStore();
  const posts = getBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const { isVisible } = useSectionVisibility('blog');

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Blog', url: 'https://apexmartialarts.com/blog' }
        ]}
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <PageHero 
          title="OUR BLOG"
          highlightedWord="BLOG"
          description="Expert insights on martial arts training, child development, fitness tips, and more."
        />
      )}

      {isVisible('posts') && (
        <Section>
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-3xl text-foreground mb-8">FEATURED ARTICLES</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <Image
                          src={getStaticImage(post.image)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-primary font-semibold text-sm tracking-wider">
                          {post.category}
                        </span>
                        <h3 className="font-heading text-2xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric' 
                              })}
                            </time>
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="font-heading text-3xl text-foreground mb-8">ALL ARTICLES</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image
                        src={getStaticImage(post.image)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-primary font-semibold text-xs tracking-wider uppercase">
                        {post.category}
                      </span>
                      <h3 className="font-heading text-xl text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all mt-auto">
                        Read More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      <CTASection />
    </Layout>
  );
};

export { BlogPage };
