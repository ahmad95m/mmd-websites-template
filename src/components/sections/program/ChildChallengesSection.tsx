"use client";
import { AlertCircle, Brain, Users, ShieldAlert, Frown, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Challenge {
  icon: string;
  title: string;
  description: string;
}

interface ChildChallengesSectionProps {
  challenges?: Challenge[];
  programName: string;
}

const iconMap: Record<string, LucideIcon> = {
  'alert-circle': AlertCircle,
  'brain': Brain,
  'users': Users,
  'shield-alert': ShieldAlert,
  'frown': Frown,
};

const defaultChallenges: Challenge[] = [
  {
    icon: 'alert-circle',
    title: "Won't Listen",
    description: "Struggles to follow directions or pay attention when spoken to"
  },
  {
    icon: 'brain',
    title: "Lacks Focus (ADHD)",
    description: "Has difficulty concentrating or staying on task for extended periods"
  },
  {
    icon: 'frown',
    title: "Low Confidence",
    description: "Hesitates to try new things or gives up easily when challenged"
  },
  {
    icon: 'users',
    title: "Shy or Withdrawn",
    description: "Finds it hard to make friends or speak up in group settings"
  },
  {
    icon: 'shield-alert',
    title: "Bullying Concerns",
    description: "Worried about standing up for themselves or being targeted"
  }
];

export const ChildChallengesSection = ({ 
  challenges = defaultChallenges,
  programName 
}: ChildChallengesSectionProps) => {
  return (
    <section className="section-padding bg-accent/30 program-content-start">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            WE CAN HELP
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
            Does Your Child Have Any of These Challenges?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Many parents come to us with similar concerns. The good news? Our {programName} program is specifically designed to address these challenges.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((challenge, index) => {
            const IconComponent = iconMap[challenge.icon] || AlertCircle;
            return (
              <div 
                key={index}
                className="group bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Card */}
        <div className="bg-primary/10 rounded-2xl p-8 md:p-10 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              How Martial Arts Transforms These Challenges
            </h3>
            <p className="text-muted-foreground mb-6">
              Through structured classes, positive reinforcement, and age-appropriate training, we help children develop the skills they need to overcome these challenges and thrive.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {[
                "Improved Focus & Attention",
                "Boosted Self-Confidence",
                "Better Social Skills",
                "Respect for Authority",
                "Bullying Prevention Skills",
                "Emotional Self-Control"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
