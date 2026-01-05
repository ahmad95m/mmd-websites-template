"use client";
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { useEffect, type ReactNode } from 'react';

interface AdminAuthGuardProps {
  children: ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
