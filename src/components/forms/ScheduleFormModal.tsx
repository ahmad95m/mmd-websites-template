"use client";
import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { useSubmitContact } from '@/hooks/useSubmitContact';

export interface ScheduleFormConfig {
  title: string;
  description: string;
  buttonText: string;
  consentText: string;
  successMessage: string;
}

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ScheduleFormConfig;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  program: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ScheduleFormModal = ({ isOpen, onClose, config }: ScheduleFormModalProps) => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  const { submit, isSubmitting } = useSubmitContact();

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const selectedProgram = programs.find(p => p.id === data.program);
    
    await submit(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        program: data.program,
        programLabel: selectedProgram?.name,
      },
      'Schedule Form Modal',
      data.program,
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        successMessage: config.successMessage,
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-primary border-none overflow-hidden [&>button]:hidden">
        {/* Accessibility - Hidden title and description for screen readers */}
        <VisuallyHidden>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </VisuallyHidden>
        
        {/* Custom Close Button - Top Right */}
        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 z-10 flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Close</span>
          </button>
        </DialogClose>
        
        <div className="p-6 pt-12">
          {/* Timer Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-3 bg-background/10 border border-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full">
              <span className="text-sm font-semibold uppercase tracking-wider">
                Limited Time & Availability
              </span>
              <span className="font-heading text-lg font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Pretitle */}
          <p className="text-primary-foreground/80 font-semibold text-xs tracking-widest uppercase text-center mb-2">
            ONLINE EXCLUSIVE OFFER
          </p>
          
          {/* Title */}
          <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center mb-3 uppercase">
            {config.title}
          </h2>
          
          {/* Description */}
          <p className="text-primary-foreground/80 text-sm text-center mb-6">
            {config.description}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Input
                placeholder="Full Name"
                {...register('name')}
                className="bg-background border-border h-12 text-foreground placeholder:text-muted-foreground"
              />
              {errors.name && (
                <p className="text-xs text-red-300 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address for info"
                {...register('email')}
                className="bg-background border-border h-12 text-foreground placeholder:text-muted-foreground"
              />
              {errors.email && (
                <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Mobile # for info via text"
                {...register('phone')}
                className="bg-background border-border h-12 text-foreground placeholder:text-muted-foreground"
              />
              {errors.phone && (
                <p className="text-xs text-red-300 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Select onValueChange={(value) => setValue('program', value)}>
                <SelectTrigger className="bg-background border-border h-12 text-foreground">
                  <SelectValue placeholder="Select a Program" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-[100]">
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name} ({program.ageRange})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full h-14 text-base font-bold uppercase tracking-wide bg-foreground text-background hover:bg-foreground/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : config.buttonText}
            </Button>

            <p className="text-xs text-primary-foreground/70 text-center leading-relaxed pt-2">
              {config.consentText}
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
