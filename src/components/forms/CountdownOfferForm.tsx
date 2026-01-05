"use client";
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';

export interface CountdownOfferConfig {
  badge: string;
  pretitle: string;
  title: string;
  description: string;
  countdownMinutes: number;
  buttonText: string;
  consentText: string;
  successMessage?: string;
}

interface CountdownOfferFormProps {
  config: CountdownOfferConfig;
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email required').max(255),
  phone: z.string().min(10, 'Valid phone required').max(20),
});

type FormData = z.infer<typeof formSchema>;

export const CountdownOfferForm = ({ config, className }: CountdownOfferFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: config.successMessage || "We'll contact you shortly with more information!",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className={`py-16 bg-secondary ${className}`}>
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                {config.badge}
              </span>
            </div>
            
            {/* Pretitle */}
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
              {config.pretitle}
            </p>
            
            {/* Title - uses secondary-foreground for proper contrast on secondary bg */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mb-4">
              {config.title}
            </h2>
            
            {/* Description */}
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-6">
              {config.description}
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <p className="text-sm text-secondary-foreground/60 mb-2 uppercase tracking-wide">
                  {isExpired ? 'Offer Expired' : 'Offer Expires In'}
                </p>
                <CountdownTimer 
                  initialMinutes={config.countdownMinutes}
                  onExpire={() => setIsExpired(true)}
                />
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <Input
                  placeholder="Full Name"
                  {...register('name')}
                  className="bg-background border-border h-12"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...register('email')}
                  className="bg-background border-border h-12"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  {...register('phone')}
                  className="bg-background border-border h-12"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
            
            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full h-14 text-lg"
              disabled={isSubmitting || isExpired}
            >
              {isSubmitting ? 'Submitting...' : isExpired ? 'Offer Expired' : config.buttonText}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              {config.consentText}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
