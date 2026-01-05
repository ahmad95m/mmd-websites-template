import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { SchedulePage } from '@/components/pages/SchedulePage';


const seo = (siteContent.seo as any)['schedule'];
export const metadata: Metadata = {
  title: seo?.title || 'SchedulePage',
  description: seo?.description || '',
};

export default function Page() {
  return <SchedulePage />;
}