"use client";
import { Star, Target, Zap, Heart, Users, Shield } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { useContentStore } from '@/store/useContentStore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { BenefitItem } from '@/types/content';

const iconMap = {
  star: Star,
  target: Target,
  zap: Zap,
  heart: Heart,
  users: Users,
  shield: Shield,
};

interface BenefitCardProps {
  benefit: BenefitItem;
}

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Star;
  
  return (
    <div className="group p-6 rounded-xl bg-card shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-heading text-2xl text-foreground mb-3 tracking-wide">
        {benefit.title}
      </h3>
      <p className="text-muted-foreground">
        {benefit.description}
      </p>
    </div>
  );
};

export const BenefitsSection = () => {
  const { getBenefits } = useContentStore();
  const benefits = getBenefits();
  
  return (
    <Section background="muted" id="benefits">
      <SectionHeader
        pretitle={benefits.pretitle}
        title={benefits.title}
      />
      
      {/* Draggable Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {benefits.items.map((benefit, index) => (
            <CarouselItem key={benefit.title} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <BenefitCard benefit={benefit} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>

      {/* Additional Skills */}
      {benefits.additionalSkills && benefits.additionalSkills.length > 0 && (
        <div className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.additionalSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-card rounded-lg px-4 py-3 text-center shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <p className="font-semibold text-foreground text-sm md:text-base">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};
