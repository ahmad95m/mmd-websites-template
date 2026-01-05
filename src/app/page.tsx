import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { HomePage } from '@/components/pages/HomePage';


const seo = (siteContent.seo as any)['home'];
export const metadata: Metadata = {
  title: seo?.title || 'HomePage',
  description: seo?.description || '',
};

export default function Page() {
  return <HomePage />;
}