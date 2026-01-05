import { useAdminStore } from '../store/useAdminStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAdminAuth() {
  const { isAuthenticated, login, logout } = useAdminStore();
  const router = useRouter();

  const handleLogin = useCallback((username: string, password: string): boolean => {
    const success = login(username, password);
    if (success) {
      router.push('/admin');
    }
    return success;
  }, [login, router]);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/admin/login');
  }, [logout, router]);

  return {
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout
  };
}
