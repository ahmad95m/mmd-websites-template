import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { BirthdayPartiesPage } from '@/components/pages/BirthdayPartiesPage';


const seo = (siteContent.seo as any)['birthday-parties'];
export const metadata: Metadata = {
  title: seo?.title || 'BirthdayPartiesPage',
  description: seo?.description || '',
};

export default function Page() {
  return <BirthdayPartiesPage />;
}