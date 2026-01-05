"use client";
import { useState } from 'react';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload, FileJson, AlertTriangle, CheckCircle } from 'lucide-react';
import { downloadJSON, readFileAsText } from '@/admin/utils/exportHelpers';
import { toast } from 'sonner';

export function SettingsPage() {
  const { exportJSON, importJSON, technicalSEO, updateTechnicalSEO } = useAdminStore();
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExport = () => {
    const json = exportJSON();
    downloadJSON(json, `site-content-${new Date().toISOString().split('T')[0]}.json`);
    toast.success('Content exported successfully!');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError('');
    setImportSuccess(false);

    try {
      const content = await readFileAsText(file);
      const success = importJSON(content);
      
      if (success) {
        setImportSuccess(true);
        toast.success('Content imported successfully!');
      } else {
        setImportError('Invalid JSON format. Please check the file structure.');
      }
    } catch {
      setImportError('Failed to read file. Please try again.');
    }

    // Reset input
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Export, import, and manage technical configuration
        </p>
      </div>

      <Tabs defaultValue="export" className="space-y-4">
        <TabsList>
          <TabsTrigger value="export">Export / Import</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO Files</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-4">
          {/* Export Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Content
              </CardTitle>
              <CardDescription>
                Download all your site content as a JSON file for backup or migration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport} className="gap-2">
                <FileJson className="h-4 w-4" />
                Export to JSON
              </Button>
            </CardContent>
          </Card>

          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Content
              </CardTitle>
              <CardDescription>
                Restore content from a previously exported JSON file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Importing will replace all current content. This action cannot be undone.
                  Make sure to export your current content first.
                </AlertDescription>
              </Alert>

              <div className="flex items-center gap-4">
                <Label htmlFor="import-file" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Upload className="h-4 w-4" />
                    Choose File
                  </div>
                  <Input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </Label>
              </div>

              {importError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{importError}</AlertDescription>
                </Alert>
              )}

              {importSuccess && (
                <Alert className="border-green-300 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Content imported successfully! Review and publish your changes.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          {/* robots.txt */}
          <Card>
            <CardHeader>
              <CardTitle>robots.txt</CardTitle>
              <CardDescription>
                Control how search engines and AI crawlers access your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={technicalSEO.robotsTxt}
                onChange={(e) => updateTechnicalSEO({ robotsTxt: e.target.value })}
                rows={15}
                className="font-mono text-sm"
                placeholder="User-agent: *&#10;Allow: /"
              />
            </CardContent>
          </Card>

          {/* Base URL */}
          <Card>
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
              <CardDescription>
                Your site's primary URL used for generating sitemaps and canonical URLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                value={technicalSEO.baseUrl}
                onChange={(e) => updateTechnicalSEO({ baseUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
