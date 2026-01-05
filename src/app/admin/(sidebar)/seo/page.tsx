"use client";
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextField, TextAreaField, SwitchField } from '@/admin/components/fields';
import { Badge } from '@/components/ui/badge';
import { validateMetaTitle, validateMetaDescription, calculateSEOScore } from '@/admin/utils/seoHelpers';

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'blog', label: 'Blog' },
  { id: 'location', label: 'Location' },
];

export function SEOEditor() {
  const { draftContent, updateDraft, llmContent, updateLLMContent } = useAdminStore();
  const seo = draftContent.seo || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <p className="text-muted-foreground">Optimize for Google and AI search engines</p>
      </div>

      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Page SEO</TabsTrigger>
          <TabsTrigger value="llm">AI/LLM Content</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          {pages.map((page) => {
            const pageSeo = seo[page.id] || { title: '', description: '', keywords: '' };
            const titleValidation = validateMetaTitle(pageSeo.title || '');
            const descValidation = validateMetaDescription(pageSeo.description || '');

            return (
              <Card key={page.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{page.label} Page</CardTitle>
                    <Badge variant={titleValidation.valid && descValidation.valid ? "default" : "secondary"}>
                      {titleValidation.valid && descValidation.valid ? "Optimized" : "Needs Work"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TextField
                    label="Meta Title"
                    value={pageSeo.title}
                    onChange={(v) => updateDraft(`seo.${page.id}.title`, v)}
                    maxLength={60}
                    showCount
                    helperText={titleValidation.message}
                  />
                  <TextAreaField
                    label="Meta Description"
                    value={pageSeo.description}
                    onChange={(v) => updateDraft(`seo.${page.id}.description`, v)}
                    maxLength={160}
                    showCount
                    rows={3}
                    helperText={descValidation.message}
                  />
                  <TextField
                    label="Keywords"
                    value={pageSeo.keywords}
                    onChange={(v) => updateDraft(`seo.${page.id}.keywords`, v)}
                    helperText="Comma-separated keywords"
                  />
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="llm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI/LLM Content (llms.txt)</CardTitle>
              <CardDescription>Content optimized for AI assistants like ChatGPT, Claude, Perplexity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextAreaField
                label="Business Summary"
                value={llmContent.businessSummary}
                onChange={(v) => updateLLMContent({ businessSummary: v })}
                rows={4}
                helperText="2-3 sentence summary for AI crawlers"
              />
              <TextField
                label="Company Name"
                value={llmContent.companyInfo.name}
                onChange={(v) => updateLLMContent({ companyInfo: { ...llmContent.companyInfo, name: v } })}
              />
              <TextField
                label="Industry"
                value={llmContent.companyInfo.industry}
                onChange={(v) => updateLLMContent({ companyInfo: { ...llmContent.companyInfo, industry: v } })}
              />
              <TextField
                label="Service Area"
                value={llmContent.companyInfo.serviceArea}
                onChange={(v) => updateLLMContent({ companyInfo: { ...llmContent.companyInfo, serviceArea: v } })}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SEOEditor;
