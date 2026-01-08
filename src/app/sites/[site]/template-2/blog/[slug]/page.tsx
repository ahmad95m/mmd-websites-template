import { Metadata } from 'next';
import BlogDetail2 from '@/components/templates/template-2/pages/BlogDetail2';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: 'APEX Martial Arts' }; // TODO: proper dynamic metadata
}

export default async function Page() {
  return <BlogDetail2 />;
}