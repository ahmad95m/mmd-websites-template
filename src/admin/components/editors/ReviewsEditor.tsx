"use client";
import { useState } from 'react';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { TextField, TextAreaField, NumberField, SelectField, SwitchField } from '../fields';
import { Card, CardContent } from '@/components/ui/card';
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
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import type { Review } from '@/types/content';
import { ScrollArea } from '@/components/ui/scroll-area';

const sourceOptions = [
  { value: 'Google', label: 'Google' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Yelp', label: 'Yelp' },
  { value: 'Website', label: 'Website' },
];

const defaultReview: Review = {
  id: 0,
  name: '',
  rating: 5,
  source: 'Google',
  text: '',
  date: new Date().toISOString().split('T')[0],
  featured: false,
  featuredTitle: ''
};

export function ReviewsEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const reviews = draftContent.reviews || [];
  
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    const newReview: Review = {
      ...defaultReview,
      id: Date.now()
    };
    setEditingReview(newReview);
    setIsDialogOpen(true);
  };

  const handleEdit = (review: Review) => {
    setEditingReview({ ...review });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingReview) return;
    
    const existingIndex = reviews.findIndex(r => r.id === editingReview.id);
    let newReviews: Review[];
    
    if (existingIndex >= 0) {
      newReviews = [...reviews];
      newReviews[existingIndex] = editingReview;
    } else {
      newReviews = [...reviews, editingReview];
    }
    
    updateDraft('reviews', newReviews);
    setIsDialogOpen(false);
    setEditingReview(null);
    toast.success(existingIndex >= 0 ? 'Review updated!' : 'Review added!');
  };

  const handleDelete = () => {
    if (deleteId === null) return;
    const newReviews = reviews.filter(r => r.id !== deleteId);
    updateDraft('reviews', newReviews);
    setDeleteId(null);
    toast.success('Review deleted');
  };

  const updateEditingReview = <K extends keyof Review>(key: K, value: Review[K]) => {
    if (!editingReview) return;
    setEditingReview({ ...editingReview, [key]: value });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">Manage customer reviews ({reviews.length} total)</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="flex items-start gap-4 py-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{review.name}</h3>
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  {review.featured && (
                    <Badge variant="default" className="bg-primary">Featured</Badge>
                  )}
                  <Badge variant="outline">{review.source}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(review)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteId(review.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No reviews yet</p>
              <Button onClick={handleAdd} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) { setIsDialogOpen(false); setEditingReview(null); }}}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingReview?.id && reviews.some(r => r.id === editingReview.id) ? 'Edit Review' : 'Add Review'}</DialogTitle>
            <DialogDescription>Fill in the review details below</DialogDescription>
          </DialogHeader>
          
          {editingReview && (
            <div className="space-y-4">
              <TextField
                label="Customer Name"
                value={editingReview.name}
                onChange={(v) => updateEditingReview('name', v)}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateEditingReview('rating', star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${star <= editingReview.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <SelectField
                  label="Source"
                  value={editingReview.source}
                  onChange={(v) => updateEditingReview('source', v)}
                  options={sourceOptions}
                />
              </div>
              
              <TextField
                label="Date"
                value={editingReview.date}
                onChange={(v) => updateEditingReview('date', v)}
                placeholder="YYYY-MM-DD"
              />
              
              <TextAreaField
                label="Review Text"
                value={editingReview.text}
                onChange={(v) => updateEditingReview('text', v)}
                rows={4}
                required
              />

              <SwitchField
                label="Featured Review"
                value={editingReview.featured || false}
                onChange={(checked) => updateEditingReview('featured', checked)}
              />

              {editingReview.featured && (
                <TextField
                  label="Featured Title"
                  value={editingReview.featuredTitle || ''}
                  onChange={(v) => updateEditingReview('featuredTitle', v)}
                  placeholder="e.g. Rapid Progress in 3 Months: BE Martial Arts Mequon Surpasses a Year's Learning in Atlanta!"
                />
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingReview(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this review. This action cannot be undone.
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
