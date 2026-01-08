import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/s3';
import { getKnownSites } from '@/lib/sites';
import { SiteProvider } from '@/components/site-provider';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const sites = await getKnownSites();
  return sites.map((site) => ({ site }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}): Promise<Metadata> {
  const { site } = await params;
  const content = await getSiteContent(site);

  if (!content) {
    return {
      title: 'Site Not Found',
    };
  }

  return {
    title: content.site.name || 'Untitled Site',
    description: content.site.tagline || '',
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  // Use decodeURIComponent to handle potential encoding issues if needed, 
  // though typically middleware passes the hostname cleanly.
  const content = await getSiteContent(site);

  if (!content) {
    notFound();
  }

  return (
    <SiteProvider content={content}>
      {children}
    </SiteProvider>
  );
}
