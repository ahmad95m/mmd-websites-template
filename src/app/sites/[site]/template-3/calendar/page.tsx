import { Metadata } from 'next';
import Calendar3 from '@/components/templates/template-3/pages/Calendar3';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <Calendar3 />;
}