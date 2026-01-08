import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { AboutPage } from '@/components/pages/AboutPage';


const seo = (siteContent.seo as any)['about'];
export const metadata: Metadata = {
  title: seo?.title || 'AboutPage',
  description: seo?.description || '',
};

export default function Page() {
  return <AboutPage />;
}