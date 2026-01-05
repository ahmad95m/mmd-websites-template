"use client";
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  initialMinutes: number;
  onExpire?: () => void;
  className?: string;
}

export const CountdownTimer = ({ 
  initialMinutes, 
  onExpire, 
  className 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const { minutes, seconds } = formatTime(timeLeft);
  const isLowTime = timeLeft < 60;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn(
        'flex items-center justify-center w-14 h-14 rounded-lg font-heading text-2xl font-bold transition-colors',
        isLowTime 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-primary text-primary-foreground'
      )}>
        {minutes}
      </div>
      <span className={cn(
        'text-2xl font-bold',
        isLowTime ? 'text-red-500' : 'text-primary'
      )}>:</span>
      <div className={cn(
        'flex items-center justify-center w-14 h-14 rounded-lg font-heading text-2xl font-bold transition-colors',
        isLowTime 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-primary text-primary-foreground'
      )}>
        {seconds}
      </div>
    </div>
  );
};
