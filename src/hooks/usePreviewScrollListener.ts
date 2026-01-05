"use client";
import { useEffect } from 'react';

/**
 * Hook to listen for scroll-to-section messages from the admin preview iframe parent
 * This enables the admin panel to scroll to specific sections when clicking in the sidebar
 */
export function usePreviewScrollListener() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'scrollToSection' && event.data?.sectionId) {
        const sectionId = event.data.sectionId;
        
        // Try to find the section element by ID
        const element = document.getElementById(sectionId);
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Also handle hash changes from URL
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100);
        }
      }
    };

    // Check initial hash on mount
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
