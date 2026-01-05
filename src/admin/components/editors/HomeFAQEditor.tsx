"use client";
import { useState } from 'react';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { TextField, TextAreaField } from '../fields';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { FAQItem } from '@/types/content';

const defaultFAQ: FAQItem = {
  question: '',
  answer: ''
};

export function HomeFAQEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const faqs = (draftContent as any).homeFaqs || [];
  
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingFAQ({ ...defaultFAQ });
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQItem, index: number) => {
    setEditingFAQ({ ...faq });
    setDeleteIndex(index);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingFAQ || !editingFAQ.question || !editingFAQ.answer) {
      toast.error('Please fill in both question and answer');
      return;
    }
    
    const existingIndex = deleteIndex !== null ? deleteIndex : -1;
    let newFAQs: FAQItem[];
    
    if (existingIndex >= 0 && existingIndex < faqs.length) {
      newFAQs = [...faqs];
      newFAQs[existingIndex] = editingFAQ;
    } else {
      newFAQs = [...faqs, editingFAQ];
    }
    
    updateDraft('homeFaqs', newFAQs);
    setIsDialogOpen(false);
    setEditingFAQ(null);
    setDeleteIndex(null);
    toast.success(existingIndex >= 0 ? 'FAQ updated!' : 'FAQ added!');
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    const newFAQs = faqs.filter((_: FAQItem, idx: number) => idx !== deleteIndex);
    updateDraft('homeFaqs', newFAQs);
    setDeleteIndex(null);
    toast.success('FAQ deleted');
  };

  const updateEditingFAQ = <K extends keyof FAQItem>(key: K, value: FAQItem[K]) => {
    if (!editingFAQ) return;
    setEditingFAQ({ ...editingFAQ, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Home Page FAQs</h1>
          <p className="text-muted-foreground">Manage frequently asked questions for the home page ({faqs.length} total)</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {/* FAQs List */}
      <div className="grid gap-4">
        {faqs.map((faq: FAQItem, index: number) => (
          <Card key={index}>
            <CardContent className="flex items-start gap-4 py-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(faq, index)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteIndex(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {faqs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No FAQs yet</p>
              <Button onClick={handleAdd} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First FAQ
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { 
        if (!open) { 
          setIsDialogOpen(false); 
          setEditingFAQ(null); 
          setDeleteIndex(null);
        } 
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{deleteIndex !== null && deleteIndex < faqs.length ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
            <DialogDescription>Fill in the FAQ details below</DialogDescription>
          </DialogHeader>
          
          {editingFAQ && (
            <div className="space-y-4">
              <TextField
                label="Question"
                value={editingFAQ.question}
                onChange={(v) => updateEditingFAQ('question', v)}
                required
              />
              
              <TextAreaField
                label="Answer"
                value={editingFAQ.answer}
                onChange={(v) => updateEditingFAQ('answer', v)}
                rows={4}
                required
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingFAQ(null); setDeleteIndex(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save FAQ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteIndex !== null && !isDialogOpen} onOpenChange={(open) => !open && setDeleteIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this FAQ. This action cannot be undone.
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

