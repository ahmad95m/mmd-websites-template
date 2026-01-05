"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface BottomBarConfig {
  message: string;
  buttonText: string;
}

interface BottomBarProps {
  config: BottomBarConfig;
  onButtonClick: () => void;
}

export const BottomBar = ({ config, onButtonClick }: BottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-primary-foreground/10 shadow-lg">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
          {/* Message */}
          <p className="text-primary-foreground text-sm sm:text-base font-medium text-center sm:text-left">
            {config.message}
          </p>
          
          {/* CTA Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onButtonClick}
            className="whitespace-nowrap gap-2 bg-background text-foreground hover:bg-background/90"
          >
            {config.buttonText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
