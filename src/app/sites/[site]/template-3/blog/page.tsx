import { Metadata } from 'next';
import Blog3 from '@/components/templates/template-3/pages/Blog3';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Blog3 />;
}