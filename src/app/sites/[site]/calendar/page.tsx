import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { CalendarPage } from '@/components/pages/CalendarPage';


const seo = (siteContent.seo as any)['calendar'];
export const metadata: Metadata = {
  title: seo?.title || 'CalendarPage',
  description: seo?.description || '',
};

export default function Page() {
  return <CalendarPage />;
}