import { Metadata } from 'next';
import BlogDetail3 from '@/components/templates/template-3/pages/BlogDetail3';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: 'APEX Martial Arts' }; // TODO: proper dynamic metadata
}

export default async function Page() {
  return <BlogDetail3 />;
}