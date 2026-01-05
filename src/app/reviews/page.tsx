import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { ReviewsPage } from '@/components/pages/ReviewsPage';


const seo = (siteContent.seo as any)['reviews'];
export const metadata: Metadata = {
  title: seo?.title || 'ReviewsPage',
  description: seo?.description || '',
};

export default function Page() {
  return <ReviewsPage />;
}