"use client";
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header2 } from './Header2';
import { Footer2 } from './Footer2';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { usePreviewScrollListener } from '@/hooks/usePreviewScrollListener';

interface Layout2Props {
  children: ReactNode;
}

export const Layout2 = ({ children }: Layout2Props) => {
  const pathname = usePathname();
  
  // Listen for scroll-to-section messages from admin preview
  usePreviewScrollListener();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background font-serif">
      <Header2 />
      <main className="flex-1">
        {children}
      </main>
      <Footer2 />
      {/* Theme Switcher */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
};