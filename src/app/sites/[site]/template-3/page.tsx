import { Metadata } from 'next';
import Index3 from '@/components/templates/template-3/pages/Index3';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Index3 />;
}