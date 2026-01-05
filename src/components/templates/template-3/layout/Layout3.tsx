import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header3 } from './Header3';
import { Footer3 } from './Footer3';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { usePreviewScrollListener } from '@/hooks/usePreviewScrollListener';

interface Layout3Props {
  children: ReactNode;
}

export const Layout3 = ({ children }: Layout3Props) => {
  const pathname = usePathname();
  
  // Listen for scroll-to-section messages from admin preview
  usePreviewScrollListener();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header3 />
      <main className="flex-1">
        {children}
      </main>
      <Footer3 />
      {/* Theme Switcher */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
};