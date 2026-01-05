"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  sections: Section[];
  otherPageLink: {
    label: string;
    href: string;
  };
}

export const LegalPageLayout = ({
  title,
  effectiveDate,
  sections,
  otherPageLink,
}: LegalPageLayoutProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isPrivacyPage = pathname.includes('privacy');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 lg:pt-36">
      {/* Top Bar */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPrivacyPage ? (
                <Shield className="w-6 h-6 text-primary" />
              ) : (
                <FileText className="w-6 h-6 text-primary" />
              )}
              <div>
                <h1 className="font-heading text-xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">Effective: {effectiveDate}</p>
              </div>
            </div>
            <Link 
              href={otherPageLink.href}
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {otherPageLink.label}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-wide py-8 lg:py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 lg:hidden shadow-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Sidebar */}
          <aside 
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border p-6 overflow-y-auto transition-transform lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-8rem)] lg:translate-x-0 lg:w-64 lg:border lg:rounded-xl",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="lg:hidden mb-6">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
                Table of Contents
              </h2>
              <div className="h-px bg-border" />
            </div>

            <nav className="space-y-1">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs mr-2">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Mobile Link to Other Page */}
            <div className="mt-6 pt-6 border-t border-border lg:hidden">
              <Link 
                href={otherPageLink.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {otherPageLink.label}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-medium">
                      {index + 1}
                    </span>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground pl-11">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
