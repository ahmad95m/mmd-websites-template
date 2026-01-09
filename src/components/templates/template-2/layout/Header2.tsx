"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getStaticImage } from '@/lib/imageMapper';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import beLogo from '@/assets/be-logo.webp';

export const Header2 = () => {
  const pathname = usePathname();
  const { getNavigation, getSiteInfo } = useContentStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isScrolled, setIsScrolled } = useUIStore();
  
  const navigation = getNavigation();
  const site = getSiteInfo();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);
  
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);
  
  const isActive = (path: string) => {
    const basePath = pathname.replace('/template-2', '');
    if (path === '/template-2') return basePath === '' || basePath === '/';
    return basePath.startsWith(path.replace('/template-2', ''));
  };
  
  const getTemplatePath = (path: string) => {
    if (path === '/') return '/template-2';
    return `/template-2${path}`;
  };
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-background border-b border-border' 
        : 'bg-transparent'
    )}>
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/template-2" className="group">
            <div className={cn(
               'relative h-14 w-auto aspect-[3/1] transition-all',
               isScrolled ? 'brightness-90' : 'brightness-100'
            )}>
              <Image 
                src={getStaticImage(site.logo) || beLogo} 
                alt={site.name || "Martial Arts Studio"} 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation - Minimal */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  href={getTemplatePath(item.path)}
                  className={cn(
                    'text-sm tracking-widest uppercase transition-all relative flex items-center gap-1',
                    isActive(getTemplatePath(item.path))
                      ? 'text-primary' 
                      : isScrolled 
                        ? 'text-muted-foreground hover:text-foreground' 
                        : 'text-primary-foreground/70 hover:text-primary-foreground'
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-card border border-border shadow-lg min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={getTemplatePath(child.path)}
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="hidden lg:block">
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                'rounded-none border-2 tracking-widest text-xs px-6',
                isScrolled 
                  ? 'border-foreground text-foreground hover:bg-foreground hover:text-background'
                  : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-secondary'
              )}
              asChild
            >
              <Link href="/template-2/schedule">BOOK CLASS</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              'lg:hidden p-2',
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-24 bg-background z-40">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={getTemplatePath(item.path)}
                className="text-2xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-none border-2 border-foreground mt-8 tracking-widest"
              asChild
            >
              <Link href="/template-2/schedule">BOOK CLASS</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
