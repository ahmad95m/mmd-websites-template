"use client";

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomBar } from './BottomBar';
import { ScheduleFormModal } from '@/components/forms/ScheduleFormModal';
import { useUIStore } from '@/store/useUIStore';
import { useContentStore } from '@/store/useContentStore';
import { usePreviewScrollListener } from '@/hooks/usePreviewScrollListener';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const { 
    isScheduleModalOpen, 
    closeScheduleModal, 
    openScheduleModal,
    hasShownInitialPopup,
    setHasShownInitialPopup 
  } = useUIStore();
  
  const content = useContentStore((state) => state.content);
  const scheduleFormConfig = content.scheduleForm;
  const bottomBarConfig = content.bottomBar;

  // Listen for scroll-to-section messages from admin preview
  usePreviewScrollListener();

  // Scroll to top on route change (Next.js handles this automatically, but we keep it for now as safeguard)
  // Actually, Next.js App Router might not scroll to top on partial navigation or if using client-side links sometimes? 
  // It generally does. But keep it if logic exists.
  useEffect(() => {
    // Ensuring window exists 
    if (typeof window !== 'undefined') {
       window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Show initial popup after 3 seconds on first visit
  useEffect(() => {
    if (!hasShownInitialPopup && scheduleFormConfig) {
      const timer = setTimeout(() => {
        openScheduleModal();
        setHasShownInitialPopup(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasShownInitialPopup, openScheduleModal, setHasShownInitialPopup, scheduleFormConfig]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Bottom Bar CTA */}
      {bottomBarConfig && (
        <BottomBar 
          config={bottomBarConfig} 
          onButtonClick={openScheduleModal}
        />
      )}
      
      {/* Schedule Form Modal */}
      {scheduleFormConfig && (
        <ScheduleFormModal
          isOpen={isScheduleModalOpen}
          onClose={closeScheduleModal}
          config={scheduleFormConfig}
        />
      )}
    </div>
  );
};
