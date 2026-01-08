"use client";

import { useState } from 'react';
import { submitContact, ContactAPIError } from '@/lib/api/contactService';
import type { FormContactData } from '@/lib/utils/formSubmission';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook for submitting contact/lead forms
 * Provides loading state, error handling, and success notifications
 */
export function useSubmitContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const submit = async (
    formData: FormContactData,
    source: string,
    programId?: string,
    options?: {
      onSuccess?: () => void;
      onError?: (error: ContactAPIError) => void;
      successMessage?: string;
      errorMessage?: string;
    }
  ) => {
    setIsSubmitting(true);
    
    try {
      await submitContact(formData, source, programId);
      
      // Show success toast
      toast({
        title: "Success!",
        description: options?.successMessage || "We'll contact you shortly with more information!",
      });
      
      // Call success callback if provided
      if (options?.onSuccess) {
        options.onSuccess();
      }
      
      return { success: true };
    } catch (error) {
      // Handle API errors
      const apiError = error instanceof ContactAPIError 
        ? error 
        : new ContactAPIError('Failed to submit form. Please try again.');
      
      // Show error toast
      toast({
        title: "Error",
        description: options?.errorMessage || apiError.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      
      // Call error callback if provided
      if (options?.onError) {
        options.onError(apiError);
      }
      
      return { success: false, error: apiError };
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    submit,
    isSubmitting,
  };
}

