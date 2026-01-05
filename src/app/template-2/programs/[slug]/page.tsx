import { Metadata } from 'next';
import ProgramDetail2 from '@/components/templates/template-2/pages/ProgramDetail2';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: 'APEX Martial Arts' }; // TODO: proper dynamic metadata
}

export default async function Page() {
  return <ProgramDetail2 />;
}