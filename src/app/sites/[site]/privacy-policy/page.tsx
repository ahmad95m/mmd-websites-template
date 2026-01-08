import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { PrivacyPage } from '@/components/pages/PrivacyPage';


const seo = (siteContent.seo as any)['privacy'];
export const metadata: Metadata = {
  title: seo?.title || 'PrivacyPage',
  description: seo?.description || '',
};

export default function Page() {
  return <PrivacyPage />;
}