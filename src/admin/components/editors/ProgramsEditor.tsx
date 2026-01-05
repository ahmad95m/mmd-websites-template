"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { getStaticImage } from '@/lib/imageMapper';
import { TextField, TextAreaField, ImageField, SwitchField, NumberField, SelectField } from '../fields';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Plus, Pencil, Trash2, Eye, Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { Program } from '@/types/content';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const generateUniqueId = () => {
  return Date.now().toString();
};

const defaultProgram: Program = {
  id: '',
  slug: '',
  name: '',
  ageRange: '',
  shortDescription: '',
  longDescription: '',
  extendedDescription: '',
  features: [],
  results: [],
  schedule: [],
  image: '',
  ctaText: 'Get Started',
  benefits: [],
  educationalContent: [],
  faqs: [],
  galleryImages: []
};

export function ProgramsEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const programs = draftContent.programs || [];
  
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    const uniqueId = generateUniqueId();
    const newProgram: Program = {
      ...defaultProgram,
      id: `program-${uniqueId}`,
      slug: `new-program-${uniqueId}`
    };
    setEditingProgram(newProgram);
    setIsDialogOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram({ ...program });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingProgram) return;
    
    const existingIndex = programs.findIndex(p => p.id === editingProgram.id);
    let newPrograms: Program[];
    
    if (existingIndex >= 0) {
      newPrograms = [...programs];
      newPrograms[existingIndex] = editingProgram;
    } else {
      newPrograms = [...programs, editingProgram];
    }
    
    updateDraft('programs', newPrograms);
    setIsDialogOpen(false);
    setEditingProgram(null);
    toast.success(existingIndex >= 0 ? 'Program updated!' : 'Program added!');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const newPrograms = programs.filter(p => p.id !== deleteId);
    updateDraft('programs', newPrograms);
    setDeleteId(null);
    toast.success('Program deleted');
  };

  const handleDuplicate = (program: Program) => {
    const duplicatedProgram: Program = {
      ...program,
      id: `program-${generateUniqueId()}`,
      slug: `${program.slug}-copy`,
      name: `${program.name} (Copy)`,
    };
    const newPrograms = [...programs, duplicatedProgram];
    updateDraft('programs', newPrograms);
    toast.success('Program duplicated!');
  };

  const updateEditingProgram = <K extends keyof Program>(key: K, value: Program[K]) => {
    if (!editingProgram) return;
    setEditingProgram({ ...editingProgram, [key]: value });
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditingProgram(prev => prev ? { ...prev, name, slug, id: slug || prev.id } : null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Manage your programs ({programs.length} total)</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Program
        </Button>
      </div>

      {/* Programs List */}
      <div className="grid gap-4">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="relative w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  {program.image ? (
                    <Image 
                      src={getStaticImage(program.image)} 
                      alt={program.name} 
                      className="object-cover"
                      fill
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs text-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info + Actions */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm">{program.name}</h3>
                      <p className="text-xs text-muted-foreground">{program.ageRange}</p>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <a href={`/programs/${program.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDuplicate(program)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(program)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(program.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{program.shortDescription}</p>
                  {/* Meta badges */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{program.features?.length || 0} features</Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{program.schedule?.length || 0} schedules</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {programs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No programs yet</p>
              <Button onClick={handleAdd} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Program
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) { setIsDialogOpen(false); setEditingProgram(null); }}}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{editingProgram?.id && programs.some(p => p.id === editingProgram.id) ? 'Edit Program' : 'Add Program'}</DialogTitle>
            <DialogDescription>Fill in the program details below</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] px-6">
            {editingProgram && (
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <TextField
                    label="Program Name"
                    value={editingProgram.name}
                    onChange={handleNameChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Slug (URL)"
                      value={editingProgram.slug}
                      onChange={(v) => updateEditingProgram('slug', v)}
                      helperText="URL-friendly identifier"
                    />
                    <TextField
                      label="Age Range"
                      value={editingProgram.ageRange}
                      onChange={(v) => updateEditingProgram('ageRange', v)}
                      placeholder="e.g., Ages 5-7"
                    />
                  </div>
                  <ImageField
                    label="Program Image"
                    value={editingProgram.image}
                    onChange={(v) => updateEditingProgram('image', v)}
                  />
                  <TextField
                    label="CTA Button Text"
                    value={editingProgram.ctaText}
                    onChange={(v) => updateEditingProgram('ctaText', v)}
                  />
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <TextAreaField
                    label="Short Description"
                    value={editingProgram.shortDescription}
                    onChange={(v) => updateEditingProgram('shortDescription', v)}
                    rows={2}
                    maxLength={200}
                    showCount
                  />
                  <TextAreaField
                    label="Long Description"
                    value={editingProgram.longDescription}
                    onChange={(v) => updateEditingProgram('longDescription', v)}
                    rows={4}
                  />
                  <TextAreaField
                    label="Extended Description"
                    value={editingProgram.extendedDescription || ''}
                    onChange={(v) => updateEditingProgram('extendedDescription', v)}
                    rows={4}
                  />
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Features (one per line)</label>
                    <textarea
                      className="w-full min-h-[150px] p-3 border border-border rounded-md text-sm"
                      value={editingProgram.features?.join('\n') || ''}
                      onChange={(e) => updateEditingProgram('features', e.target.value.split('\n').filter(Boolean))}
                      placeholder="30-minute high-energy classes&#10;Game-based learning approach&#10;Focus on motor skill development"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {editingProgram.features?.length || 0} features
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Schedule</label>
                    {(editingProgram.schedule || []).map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          className="flex-1 p-2 border border-border rounded-md text-sm"
                          value={item.day}
                          onChange={(e) => {
                            const newSchedule = [...(editingProgram.schedule || [])];
                            newSchedule[index] = { ...item, day: e.target.value };
                            updateEditingProgram('schedule', newSchedule);
                          }}
                          placeholder="Day"
                        />
                        <input
                          className="flex-1 p-2 border border-border rounded-md text-sm"
                          value={item.time}
                          onChange={(e) => {
                            const newSchedule = [...(editingProgram.schedule || [])];
                            newSchedule[index] = { ...item, time: e.target.value };
                            updateEditingProgram('schedule', newSchedule);
                          }}
                          placeholder="Time"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newSchedule = (editingProgram.schedule || []).filter((_, i) => i !== index);
                            updateEditingProgram('schedule', newSchedule);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newSchedule = [...(editingProgram.schedule || []), { day: '', time: '' }];
                        updateEditingProgram('schedule', newSchedule);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Schedule
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gallery Images</label>
                    <p className="text-xs text-muted-foreground mb-3">
                      {`Add images to showcase in the program's photo gallery section.`}
                    </p>
                    <div className="space-y-3">
                      {(editingProgram.galleryImages || []).map((imageUrl, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <ImageField
                              label=""
                              value={imageUrl}
                              onChange={(v) => {
                                const newImages = [...(editingProgram.galleryImages || [])];
                                newImages[index] = v;
                                updateEditingProgram('galleryImages', newImages);
                              }}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-1"
                            onClick={() => {
                              const newImages = (editingProgram.galleryImages || []).filter((_, i) => i !== index);
                              updateEditingProgram('galleryImages', newImages);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        const newImages = [...(editingProgram.galleryImages || []), ''];
                        updateEditingProgram('galleryImages', newImages);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {editingProgram.galleryImages?.length || 0} images in gallery
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </ScrollArea>

          <DialogFooter className="px-6 pb-6">
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingProgram(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this program. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
