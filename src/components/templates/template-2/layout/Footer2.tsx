"use client";
import Link from 'next/link';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { useContentStore } from '@/store/useContentStore';
import beLogo from '@/assets/be-logo.webp';

export const Footer2 = () => {
  const { getSiteInfo, getFooter, getPrograms } = useContentStore();
  
  const site = getSiteInfo();
  const footer = getFooter();
  const programs = getPrograms();
  
  const getTemplatePath = (path: string) => {
    if (path === '/') return '/template-2';
    return `/template-2${path}`;
  };
  
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer - Editorial Grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-12 gap-8">
          {/* Brand - Large */}
          <div className="col-span-12 lg:col-span-5 mb-8 lg:mb-0">
            <Link href="/template-2" className="inline-block mb-8">
              <div className="relative h-16 w-auto aspect-[3/1]">
                <Image 
                  src={getStaticImage(site.logo) || beLogo} 
                  alt={site.name || "Martial Arts Studio"} 
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-secondary-foreground/70 max-w-sm leading-relaxed">
              {footer.description}
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-6 lg:col-span-2">
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 text-secondary-foreground/50">Navigate</h3>
            <ul className="space-y-4">
              {footer.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={getTemplatePath(link.path)}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Programs */}
          <div className="col-span-6 lg:col-span-2">
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 text-secondary-foreground/50">Programs</h3>
            <ul className="space-y-4">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={getTemplatePath(`/programs/${program.slug}`)}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-12 lg:col-span-3">
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 text-secondary-foreground/50">Contact</h3>
            <div className="space-y-4 text-sm text-secondary-foreground/70">
              <p>{site.address.street}</p>
              <p>{site.address.city}, {site.address.state} {site.address.zip}</p>
              <a href={`tel:${site.phone}`} className="block hover:text-primary transition-colors">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block hover:text-primary transition-colors">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          {/* Legal Links Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-xs tracking-widest text-secondary-foreground/50 mb-4">
            {footer.legal.map((link) => (
              <Link
                key={link.path}
                href={getTemplatePath(link.path)}
                className="hover:text-primary transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Copyright & Built By Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-widest text-secondary-foreground/50 pt-4 border-t border-secondary-foreground/10">
            <p>{footer.copyright}</p>
            <a 
              href="https://managemydojo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built by Manage My Dojo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
