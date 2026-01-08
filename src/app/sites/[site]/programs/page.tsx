import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { ProgramsPage } from '@/components/pages/ProgramsPage';


const seo = (siteContent.seo as any)['programs'];
export const metadata: Metadata = {
  title: seo?.title || 'ProgramsPage',
  description: seo?.description || '',
};

export default function Page() {
  return <ProgramsPage />;
}