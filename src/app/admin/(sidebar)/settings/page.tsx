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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Download, Upload, FileJson, AlertTriangle, CheckCircle, File } from 'lucide-react';
import { downloadJSON, readFileAsText } from '@/admin/utils/exportHelpers';
import { toast } from 'sonner';

export function SettingsPage() {
  const { exportJSON, importJSON, technicalSEO, updateTechnicalSEO } = useAdminStore();
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingFileContent, setPendingFileContent] = useState<string | null>(null);

  const handleExport = () => {
    try {
      const json = exportJSON();
      const filename = `site-content-${new Date().toISOString().split('T')[0]}.json`;
      downloadJSON(json, filename);
      toast.success('Content exported successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to export content');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file extension
    if (!file.name.endsWith('.json')) {
      setImportError('Invalid file type. Please select a .json file.');
      e.target.value = '';
      return;
    }

    setImportError('');
    setImportSuccess(false);
    setSelectedFile(file);

    // Validate file content before showing confirmation
    try {
      const content = await readFileAsText(file);
      // Quick JSON validation
      try {
        const parsed = JSON.parse(content);
        if (!parsed || typeof parsed !== 'object') {
          setImportError('Invalid JSON structure. The file must contain a valid JSON object.');
          e.target.value = '';
          setSelectedFile(null);
          return;
        }
        // Store content for confirmation dialog
        setPendingFileContent(content);
        setShowConfirmDialog(true);
      } catch (parseError) {
        setImportError('Invalid JSON format. The file is not valid JSON.');
        e.target.value = '';
        setSelectedFile(null);
      }
    } catch (readError) {
      setImportError('Failed to read file. Please try again.');
      e.target.value = '';
      setSelectedFile(null);
    }
  };

  const handleConfirmImport = () => {
    if (!pendingFileContent) {
      setShowConfirmDialog(false);
      return;
    }

    const result = importJSON(pendingFileContent);
    
    if (result.success) {
      setImportSuccess(true);
      setImportError('');
      toast.success('Content imported successfully!');
    } else {
      setImportError(result.error || 'Failed to import content. Please check the file format.');
      setImportSuccess(false);
    }

    // Reset state
    setShowConfirmDialog(false);
    setPendingFileContent(null);
    setSelectedFile(null);
    
    // Reset file input
    const fileInput = document.getElementById('import-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleCancelImport = () => {
    setShowConfirmDialog(false);
    setPendingFileContent(null);
    setSelectedFile(null);
    const fileInput = document.getElementById('import-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Label htmlFor="import-file" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Upload className="h-4 w-4" />
                      Choose JSON File
                    </div>
                    <Input
                      id="import-file"
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </Label>
                </div>
                
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <File className="h-4 w-4" />
                    <span>Selected: {selectedFile.name}</span>
                    <span className="text-xs">({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                  </div>
                )}
              </div>

              <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Import</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will replace all current content with the imported data. This action cannot be undone.
                      <br />
                      <br />
                      <strong>Make sure you have exported your current content as a backup before proceeding.</strong>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancelImport}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmImport} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Import and Replace
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

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
