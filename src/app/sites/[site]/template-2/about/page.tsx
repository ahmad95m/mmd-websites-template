import { Metadata } from 'next';
import About2 from '@/components/templates/template-2/pages/About2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <About2 />;
}