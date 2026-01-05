"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { getStaticImage } from '@/lib/imageMapper';
import { TextField, TextAreaField, ImageField, SwitchField, SelectField } from '../fields';
import { RichTextField } from '../fields/RichTextField';
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
import { Plus, Pencil, Trash2, Eye, Star } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogPost } from '@/types/content';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoryOptions = [
  { value: 'Youth Development', label: 'Youth Development' },
  { value: 'Getting Started', label: 'Getting Started' },
  { value: 'Personal Development', label: 'Personal Development' },
  { value: 'Adult Fitness', label: 'Adult Fitness' },
  { value: 'Training Tips', label: 'Training Tips' },
  { value: 'News', label: 'News' },
];

const defaultBlogPost: BlogPost = {
  id: 0,
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  category: 'Youth Development',
  readTime: '5 min read',
  image: '',
  featured: false
};

export function BlogEditor() {
  const { draftContent, updateDraft } = useAdminStore();
  const posts = draftContent.blog || [];
  
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    const newPost: BlogPost = {
      ...defaultBlogPost,
      id: Date.now(),
      slug: `new-post-${Date.now()}`
    };
    setEditingPost(newPost);
    setIsDialogOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingPost) return;
    
    const existingIndex = posts.findIndex(p => p.id === editingPost.id);
    let newPosts: BlogPost[];
    
    if (existingIndex >= 0) {
      newPosts = [...posts];
      newPosts[existingIndex] = editingPost;
    } else {
      newPosts = [...posts, editingPost];
    }
    
    updateDraft('blog', newPosts);
    setIsDialogOpen(false);
    setEditingPost(null);
    toast.success(existingIndex >= 0 ? 'Post updated!' : 'Post added!');
  };

  const handleDelete = () => {
    if (deleteId === null) return;
    const newPosts = posts.filter(p => p.id !== deleteId);
    updateDraft('blog', newPosts);
    setDeleteId(null);
    toast.success('Post deleted');
  };

  const updateEditingPost = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, [key]: value });
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditingPost(prev => prev ? { ...prev, title, slug } : null);
  };

  // Estimate read time from content
  const estimateReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage blog posts ({posts.length} total)</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center gap-4 py-4">
              {/* Image */}
              <div className="relative w-24 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                {post.image ? (
                  <Image 
                    src={getStaticImage(post.image)} 
                    alt={post.title} 
                    className="object-cover"
                    fill
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  {post.featured && (
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteId(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Button onClick={handleAdd} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) { setIsDialogOpen(false); setEditingPost(null); }}}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{editingPost?.id && posts.some(p => p.id === editingPost.id) ? 'Edit Post' : 'Create Post'}</DialogTitle>
            <DialogDescription>Write and publish your blog post</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] px-6">
            {editingPost && (
              <Tabs defaultValue="content" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="meta">Meta & SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <TextField
                    label="Title"
                    value={editingPost.title}
                    onChange={handleTitleChange}
                    required
                  />
                  
                  <TextAreaField
                    label="Excerpt"
                    value={editingPost.excerpt}
                    onChange={(v) => updateEditingPost('excerpt', v)}
                    rows={2}
                    maxLength={200}
                    showCount
                    helperText="Short summary shown in blog listings"
                  />

                  <RichTextField
                    label="Content"
                    value={editingPost.content}
                    onChange={(v) => {
                      updateEditingPost('content', v);
                      updateEditingPost('readTime', estimateReadTime(v));
                    }}
                  />
                </TabsContent>

                <TabsContent value="meta" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Slug (URL)"
                      value={editingPost.slug}
                      onChange={(v) => updateEditingPost('slug', v)}
                      helperText="URL-friendly identifier"
                    />
                    <TextField
                      label="Author"
                      value={editingPost.author}
                      onChange={(v) => updateEditingPost('author', v)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label="Category"
                      value={editingPost.category}
                      onChange={(v) => updateEditingPost('category', v)}
                      options={categoryOptions}
                    />
                    <TextField
                      label="Date"
                      value={editingPost.date}
                      onChange={(v) => updateEditingPost('date', v)}
                      placeholder="YYYY-MM-DD"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Read Time"
                      value={editingPost.readTime}
                      onChange={(v) => updateEditingPost('readTime', v)}
                      helperText="Auto-calculated from content"
                    />
                  </div>

                  <ImageField
                    label="Featured Image"
                    value={editingPost.image}
                    onChange={(v) => updateEditingPost('image', v)}
                  />

                  <SwitchField
                    label="Featured Post"
                    value={editingPost.featured}
                    onChange={(v) => updateEditingPost('featured', v)}
                    description="Featured posts appear prominently on the blog page"
                  />
                </TabsContent>
              </Tabs>
            )}
          </ScrollArea>

          <DialogFooter className="px-6 pb-6">
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingPost(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this blog post. This action cannot be undone.
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
