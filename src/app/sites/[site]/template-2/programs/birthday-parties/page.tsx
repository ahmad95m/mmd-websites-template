import { Metadata } from 'next';
import BirthdayParties2 from '@/components/templates/template-2/pages/BirthdayParties2';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <BirthdayParties2 />;
}