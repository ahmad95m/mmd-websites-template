import { Metadata } from 'next';
import Index2 from '@/components/templates/template-2/pages/Index2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Index2 />;
}