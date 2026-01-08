import { getSiteContent } from '@/lib/s3';
import { HomePage } from '@/components/pages/HomePage';

type Props = {
  params: Promise<{ site: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { site } = await params;
  const content = await getSiteContent(site);
  const seo = (content?.seo as any)?.['home'];
  
  return {
    title: seo?.title || 'Home',
    description: seo?.description || '',
  };
}

export default function Page() {
  return <HomePage />;
}