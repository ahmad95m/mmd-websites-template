import { AdminLayout } from '@/admin/components/layout/AdminLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
