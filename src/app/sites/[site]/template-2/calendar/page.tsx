import { Metadata } from 'next';
import Calendar2 from '@/components/templates/template-2/pages/Calendar2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Calendar2 />;
}