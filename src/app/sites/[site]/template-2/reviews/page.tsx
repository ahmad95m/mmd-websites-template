import { Metadata } from 'next';
import Reviews2 from '@/components/templates/template-2/pages/Reviews2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Reviews2 />;
}