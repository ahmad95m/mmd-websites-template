import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { BlogDetailPage } from '@/components/pages/BlogDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programs = siteContent.programs;
  const blog = siteContent.blog;
  
  const item = (programs.find((p: any) => p.slug === slug) || blog.find((p: any) => p.slug === slug)) as any;
  
  if (!item) return {
    title: 'Page Not Found',
  };

  return {
    title: item.name || item.title,
    description: item.shortDescription || item.excerpt,
  };
}

export default async function Page() {
  return <BlogDetailPage />;
}