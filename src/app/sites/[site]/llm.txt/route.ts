import { getSiteContent } from '@/lib/s3';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ site: string }> }
) {
  const { site } = await params;
  const content = await getSiteContent(site);

  if (!content) {
    return new NextResponse('Site not found', { status: 404 });
  }

  // If we have explicit llmsTxt in technicalSEO, use that
  if (content.technicalSEO?.llmsTxt) {
     return new NextResponse(content.technicalSEO.llmsTxt, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Otherwise, generate it from the llmContent
  const llm = content.llmContent;
  let text = `# ${llm?.companyInfo?.name || site}\n\n`;
  
  if (llm?.businessSummary) text += `${llm.businessSummary}\n\n`;
  
  if (llm?.programs?.length) {
    text += `## Programs\n`;
    llm.programs.forEach(p => {
      text += `- ${p.name} (${p.ageRange}): ${p.description}\n`;
    });
    text += `\n`;
  }

  if (llm?.locations?.length) {
    text += `## Locations\n`;
    llm.locations.forEach(l => {
      text += `- ${l.name}: ${l.address} (${l.phone})\n`;
    });
    text += `\n`;
  }

  // Add more sections as needed

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
