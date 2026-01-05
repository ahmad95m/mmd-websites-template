"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import beLogo from '@/assets/be-logo.webp';

export const Footer = () => {
  const { getSiteInfo, getFooter, getPrograms } = useContentStore();
  
  const site = getSiteInfo();
  const footer = getFooter();
  const programs = getPrograms();
  
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
  };
  
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src={beLogo} 
                alt="BE Martial Arts" 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-secondary-foreground/70 mb-6">
              {footer.description}
            </p>
            <div className="flex gap-4">
              {Object.entries(site.social).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
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
            <h3 className="font-heading text-xl tracking-wider mb-6">PROGRAMS</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl tracking-wider mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl tracking-wider mb-6">CONTACT US</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    {site.address.street}<br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  {site.hours.map((h, i) => (
                    <p key={i}>{h.days}: {h.hours}</p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-6">
          {/* Legal Links Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60 mb-4">
            <div className="flex gap-6">
              {footer.legal.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Copyright & Built By Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60 pt-4 border-t border-secondary-foreground/10">
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
