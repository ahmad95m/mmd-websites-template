import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { BlogPage } from '@/components/pages/BlogPage';


const seo = (siteContent.seo as any)['blog'];
export const metadata: Metadata = {
  title: seo?.title || 'BlogPage',
  description: seo?.description || '',
};

export default function Page() {
  return <BlogPage />;
}