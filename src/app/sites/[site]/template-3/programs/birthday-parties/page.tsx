import { Metadata } from 'next';
import BirthdayParties3 from '@/components/templates/template-3/pages/BirthdayParties3';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <BirthdayParties3 />;
}