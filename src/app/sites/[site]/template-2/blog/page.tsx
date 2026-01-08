import { Metadata } from 'next';
import Blog2 from '@/components/templates/template-2/pages/Blog2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Blog2 />;
}