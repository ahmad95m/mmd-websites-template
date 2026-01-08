import { Metadata } from 'next';
import About3 from '@/components/templates/template-3/pages/About3';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <About3 />;
}