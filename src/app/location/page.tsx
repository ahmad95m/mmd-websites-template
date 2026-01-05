import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { LocationPage } from '@/components/pages/LocationPage';


const seo = (siteContent.seo as any)['location'];
export const metadata: Metadata = {
  title: seo?.title || 'LocationPage',
  description: seo?.description || '',
};

export default function Page() {
  return <LocationPage />;
}