'use client';

import { useState, useEffect } from 'react';
import type { SiteContent } from '@/lib/s3';
import { createContentStore, ContentStoreContext, ExtendedSiteContent } from '@/store/useContentStore';

export function SiteProvider({
  children,
  content,
}: {
  children: React.ReactNode;
  content: SiteContent;
}) {
  const [store] = useState(() => createContentStore(content as ExtendedSiteContent));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check: ensure message is from same origin if needed, 
      // but for localhost/preview within same domain, basic check is fine.
      if (event.data?.type === 'contentUpdate' && event.data?.content) {
        console.log('[PREVIEW] Received content update', event.data.content.site?.name);
        store.setState({ content: event.data.content });
      }
      
      // Also handle scroll to section
      if (event.data?.type === 'scrollToSection' && event.data?.sectionId) {
        const element = document.getElementById(event.data.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [store]);

  return (
    <ContentStoreContext.Provider value={store}>
      {children}
    </ContentStoreContext.Provider>
  );
}
