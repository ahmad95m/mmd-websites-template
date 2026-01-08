"use client";
import Link from 'next/link';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Image,
  Users,
  Star,
  BookOpen,
  Search,
  Palette,
  Inbox,
  ArrowRight,
  FileJson,
  AlertCircle
} from 'lucide-react';

const quickActions = [
  { label: 'Site Info', path: '/admin/edit/site-info', icon: Building2, description: 'Update contact details' },
  { label: 'Hero Section', path: '/admin/edit/hero', icon: Image, description: 'Edit homepage hero' },
  { label: 'Programs', path: '/admin/edit/programs', icon: Users, description: 'Manage programs' },
  { label: 'Reviews', path: '/admin/edit/reviews', icon: Star, description: 'Add/edit reviews' },
  { label: 'Blog Posts', path: '/admin/edit/blog', icon: BookOpen, description: 'Create blog content' },
  { label: 'SEO Settings', path: '/admin/seo', icon: Search, description: 'Optimize for search' },
  { label: 'Theme', path: '/admin/theme', icon: Palette, description: 'Change template' },
  { label: 'Form Submissions', path: '/admin/submissions', icon: Inbox, description: 'View leads' },
];

export function AdminDashboard() {
  const { hasUnsavedChanges, activeTemplate, draftContent } = useAdminStore();

  const stats = [
    { label: 'Programs', value: draftContent.programs?.length || 0, icon: Users },
    { label: 'Reviews', value: draftContent.reviews?.length || 0, icon: Star },
    { label: 'Blog Posts', value: draftContent.blog?.length || 0, icon: BookOpen },
    { label: 'Calendar Events', value: draftContent.calendarEvents?.length || 0, icon: Inbox },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your CMS admin panel. Manage your website content here.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Status Banner */}
      <Card className={hasUnsavedChanges ? "border-amber-300 bg-amber-50" : "border-green-300 bg-green-50"}>
        <CardContent className="flex items-center gap-4 py-4">
          {hasUnsavedChanges ? (
            <>
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">You have unsaved changes</p>
                <p className="text-sm text-amber-600">Click "Publish" in the header to save your changes</p>
              </div>
            </>
          ) : (
            <>
              <FileJson className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">All changes published</p>
                <p className="text-sm text-green-600">Your site content is up to date</p>
              </div>
            </>
          )}
          <Badge variant="outline" className="ml-auto">
            {activeTemplate.replace('template', 'Template ')}
          </Badge>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} href={action.path}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-base">{action.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <CardDescription>{action.description}</CardDescription>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Site Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Current site configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Site Name</dt>
              <dd className="text-lg font-semibold">{draftContent.site?.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Tagline</dt>
              <dd className="text-lg">{draftContent.site?.tagline}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
              <dd>{draftContent.site?.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Email</dt>
              <dd>{draftContent.site?.email}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
