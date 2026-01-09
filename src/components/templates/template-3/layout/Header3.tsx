import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getStaticImage } from '@/lib/imageMapper';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import beLogo from '@/assets/be-logo.webp';

export const Header3 = () => {
  const pathname = usePathname();
  const { getSiteInfo, getNavigation } = useContentStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isScrolled, setIsScrolled } = useUIStore();
  
  const site = getSiteInfo();
  const navigation = getNavigation();
  
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
    const basePath = pathname.replace('/template-3', '');
    if (path === '/template-3') return basePath === '' || basePath === '/';
    return basePath.startsWith(path.replace('/template-3', ''));
  };
  
  const getTemplatePath = (path: string) => {
    if (path === '/') return '/template-3';
    return `/template-3${path}`;
  };
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border' 
        : 'bg-transparent'
    )}>
      {/* Top Bar - Theme accent */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary h-1" />
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/template-3" className="flex items-center group">
            <div className="relative h-12 w-auto aspect-[3/1] group-hover:scale-105 transition-transform">
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
              <div key={item.path} className="relative group">
                <Link
                  href={getTemplatePath(item.path)}
                  className={cn(
                    'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all relative flex items-center gap-1',
                    isActive(getTemplatePath(item.path))
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent transition-transform origin-left',
                    isActive(getTemplatePath(item.path)) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )} />
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-card/95 backdrop-blur-xl border border-border rounded-lg shadow-xl min-w-[240px] overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={getTemplatePath(child.path)}
                          className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
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
          
          {/* CTA & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider text-xs px-6 border-0 shadow-lg shadow-primary/25"
              asChild
            >
              <Link href="/template-3/schedule">FREE TRIAL</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(5rem+4px)] bg-background/98 z-40">
          <div className="flex flex-col p-6 gap-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={getTemplatePath(item.path)}
                className={cn(
                  'py-4 text-xl font-bold uppercase tracking-wider border-b border-border transition-colors',
                  isActive(getTemplatePath(item.path)) ? 'text-primary' : 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold uppercase tracking-wider py-6"
              asChild
            >
              <Link href="/template-3/schedule">START FREE TRIAL</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};