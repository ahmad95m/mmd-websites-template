"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight } from 'lucide-react';

export const CTA2 = () => {
  const { getCta } = useContentStore();
  const cta = getCta();
  
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-primary tracking-[0.3em] text-xs mb-4">
          {cta.urgencyText}
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
          {cta.title}
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {cta.description}
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background tracking-widest text-xs px-10 py-6"
          asChild
        >
          <Link href="/template-2/schedule" className="flex items-center gap-2">
            {cta.buttonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
