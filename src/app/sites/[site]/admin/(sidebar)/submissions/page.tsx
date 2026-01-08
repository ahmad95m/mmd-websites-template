"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Download, RefreshCw, Mail, Phone, Calendar } from 'lucide-react';
import { exportToCSV } from '@/admin/utils/exportHelpers';
import type { FormSubmission } from '@/admin/types';

// Demo submissions data
const demoSubmissions: FormSubmission[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(480) 555-1234',
    program: 'little-champions',
    message: 'Interested in enrolling my 6-year-old',
    source: 'Schedule Form',
    submittedAt: '2024-12-28T10:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(480) 555-5678',
    program: 'adult',
    message: 'Looking for adult self-defense classes',
    source: 'Countdown Offer',
    submittedAt: '2024-12-27T15:45:00Z',
    status: 'contacted'
  },
  {
    id: '3',
    name: 'Mike Williams',
    email: 'mike.w@email.com',
    phone: '(480) 555-9012',
    program: 'junior-warriors',
    message: 'My son is 10 and interested in martial arts',
    source: 'Schedule Form',
    submittedAt: '2024-12-26T09:15:00Z',
    status: 'converted'
  },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-amber-100 text-amber-800',
  converted: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

export function FormSubmissions() {
  const [submissions] = useState<FormSubmission[]>(demoSubmissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredSubmissions as unknown as Record<string, unknown>[], `form-submissions-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Form Submissions</h1>
        <p className="text-muted-foreground mt-1">
          View and manage leads from your website forms
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-sm text-muted-foreground">Total Submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {submissions.filter(s => s.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">
              {submissions.filter(s => s.status === 'contacted').length}
            </div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter(s => s.status === 'converted').length}
            </div>
            <p className="text-sm text-muted-foreground">Converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No submissions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <a href={`mailto:${sub.email}`} className="hover:underline">
                            {sub.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {sub.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{sub.program}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.source}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(sub.submittedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[sub.status]}>
                        {sub.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Integration Note */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">API Integration</CardTitle>
          <CardDescription>
            This page displays demo data. Connect your backend API endpoint to fetch real form submissions.
            Configure your API URL in Settings → API Configuration.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default FormSubmissions;
