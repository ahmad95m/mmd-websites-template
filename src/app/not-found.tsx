import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { SiteProvider } from '@/components/site-provider';
import { fallbackContent } from '@/lib/fallback-content';

export default function NotFound() {
  return (
    <SiteProvider content={fallbackContent}>
      <NotFoundPage />
    </SiteProvider>
  );
}
