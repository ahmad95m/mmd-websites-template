"use client";
import Link from 'next/link';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import beLogo from '@/assets/be-logo.webp';

export const Footer3 = () => {
  const { getSiteInfo, getFooter, getPrograms } = useContentStore();
  
  const site = getSiteInfo();
  const footer = getFooter();
  const programs = getPrograms();
  
  const getTemplatePath = (path: string) => {
    if (path === '/') return '/template-3';
    return `/template-3${path}`;
  };
  
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
  };
  
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/template-3" className="flex items-center gap-3 mb-6">
              <div className="relative h-12 w-auto aspect-[3/1]">
                <Image 
                  src={getStaticImage(site.logo) || beLogo} 
                  alt={site.name || "Martial Arts Studio"} 
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              {footer.description}
            </p>
            <div className="flex gap-3">
              {Object.entries(site.social).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-accent transition-all text-muted-foreground hover:text-primary-foreground"
                    aria-label={platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="text-secondary-foreground font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Programs
            </h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={getTemplatePath(`/programs/${program.slug}`)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-secondary-foreground font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={getTemplatePath(link.path)}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-secondary-foreground font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-destructive rounded-full" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>
                    {site.address.street}<br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-destructive" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Legal Links Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-muted-foreground mb-4">
            {footer.legal.map((link) => (
              <Link
                key={link.path}
                href={getTemplatePath(link.path)}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Copyright & Built By Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
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