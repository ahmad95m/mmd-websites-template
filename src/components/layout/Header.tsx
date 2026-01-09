"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import beLogo from '@/assets/be-logo.webp';

export const Header = () => {
  const pathname = usePathname();
  const { getSiteInfo, getNavigation } = useContentStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isScrolled, setIsScrolled } = useUIStore();
  
  const site = getSiteInfo();
  const navigation = getNavigation();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Pages that have light backgrounds and need solid header always
  const lightBackgroundPages = ['/privacy-policy', '/terms-of-service'];
  // Ensure pathname is not null (Next.js 13+ it shouldn't be null but type says otherwise sometimes)
  const currentPath = pathname || '/';
  const needsSolidHeader = lightBackgroundPages.includes(currentPath);
  
  // Effective scrolled state - force solid on light background pages
  const effectiveScrolled = isScrolled || needsSolidHeader;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);
  
  useEffect(() => {
    closeMobileMenu();
  }, [currentPath, closeMobileMenu]);
  
  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      effectiveScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    )}>
      {/* Top Bar */}
      <div className={cn(
        'border-b transition-all duration-300',
        effectiveScrolled ? 'border-border bg-muted/50' : 'border-primary-foreground/10 bg-secondary/50'
      )}>
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <p className={cn(
              'hidden sm:block transition-colors',
              effectiveScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80'
            )}>
              {site.name} – {site.tagline}
            </p>
            <a 
              href={`tel:${site.phone}`} 
              className={cn(
                'flex items-center gap-2 font-medium transition-colors hover:text-primary',
                effectiveScrolled ? 'text-foreground' : 'text-primary-foreground'
              )}
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={cn(
               'relative h-12 sm:h-14 w-auto aspect-[3/1] transition-all duration-300',
               effectiveScrolled 
                 ? '[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(50%)_saturate(1000%)_hue-rotate(200deg)]' 
                 : 'brightness-100'
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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div 
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.path)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.path}
                  className={cn(
                    'px-4 py-2 font-medium text-sm uppercase tracking-wider transition-colors flex items-center gap-1',
                    isActive(item.path) 
                      ? 'text-primary' 
                      : effectiveScrolled 
                        ? 'text-foreground hover:text-primary' 
                        : 'text-primary-foreground/90 hover:text-primary-foreground'
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown */}
                {item.children && openDropdown === item.path && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground hover:text-primary"
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
          
          {/* CTA Button & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeSwitcher />
            <Button variant="nav" size="lg" onClick={() => useUIStore.getState().openScheduleModal()}>
              SCHEDULE & PRICING
            </Button>
          </div>
          
          {/* Mobile Theme & Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className={cn(
                'p-2 transition-colors',
                effectiveScrolled ? 'text-foreground' : 'text-primary-foreground'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container-wide px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    'block py-2 font-medium uppercase tracking-wider transition-colors',
                    isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-muted">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className="block py-1 text-sm text-muted-foreground hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="cta" size="lg" className="w-full mt-6" onClick={() => useUIStore.getState().openScheduleModal()}>
              SCHEDULE & PRICING
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
