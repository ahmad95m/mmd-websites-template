import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { TermsPage } from '@/components/pages/TermsPage';


const seo = (siteContent.seo as any)['terms'];
export const metadata: Metadata = {
  title: seo?.title || 'TermsPage',
  description: seo?.description || '',
};

export default function Page() {
  return <TermsPage />;
}