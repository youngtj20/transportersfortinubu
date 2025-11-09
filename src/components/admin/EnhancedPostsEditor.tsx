'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Upload,
  X,
  Eye,
  Save,
  Loader2,
  Image as ImageIcon,
  Video,
  Grid,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  published: boolean;
  category: string;
  tags: string;
  galleryImages?: string[];
}

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

export function EnhancedPostsEditor() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Post>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    published: false,
    category: '',
    tags: '',
    galleryImages: [],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          const data = await response.json();
          const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
          setUploadedMedia((prev) => [
            ...prev,
            {
              url: data.url,
              type: mediaType,
              caption: file.name.replace(/\.[^/.]+$/, ''),
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (e.currentTarget) e.currentTarget.value = '';
    }
  };

  const addToGallery = (url: string) => {
    if (!galleryImages.includes(url)) {
      setGalleryImages((prev) => [...prev, url]);
    }
  };

  const removeFromGallery = (url: string) => {
    setGalleryImages((prev) => prev.filter((img) => img !== url));
  };

  const insertMediaToContent = (url: string, type: 'image' | 'video') => {
    let insertText = '';
    if (type === 'image') {
      insertText = `\n![Image](${url})\n`;
    } else {
      insertText = `\n[Video](${url})\n`;
    }
    setFormData((prev) => ({
      ...prev,
      content: prev.content + insertText,
    }));
  };

  const setFeaturedImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: url,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      setSaveError('Title and slug are required');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const url = editingPostId ? `/api/posts/${editingPostId}` : '/api/posts';
      const method = editingPostId ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        galleryImages,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchPosts();
        setIsDialogOpen(false);
        resetForm();
        setSaveError('');
      } else {
        const error = await response.json();
        setSaveError(error.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setSaveError('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id || null);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      published: post.published,
      category: post.category,
      tags: post.tags,
      galleryImages: post.galleryImages || [],
    });
    setGalleryImages(post.galleryImages || []);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      published: false,
      category: '',
      tags: '',
      galleryImages: [],
    });
    setGalleryImages([]);
    setUploadedMedia([]);
    setEditingPostId(null);
    setPreviewMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Posts Editor</h2>
          <p className="text-gray-600">Create and manage posts with image galleries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPostId ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
              <DialogDescription>
                Create a beautiful post with images, videos, and galleries
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="post-slug"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      placeholder="News, Update, etc."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, tags: e.target.value }))
                      }
                      placeholder="tag1, tag2, tag3"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    placeholder="Brief summary of the post"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="content">Content</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {previewMode ? 'Edit' : 'Preview'}
                    </Button>
                  </div>
                  {previewMode ? (
                    <div className="prose prose-lg max-w-none bg-gray-50 p-4 rounded-lg">
                      <div className="whitespace-pre-wrap text-gray-700">
                        {formData.content}
                      </div>
                    </div>
                  ) : (
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, content: e.target.value }))
                      }
                      placeholder="Write your post content here..."
                      rows={10}
                      className="font-mono text-sm mt-1"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, published: e.target.checked }))
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    Published
                  </Label>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4">
                <div>
                  <Label>Featured Image</Label>
                  {formData.featuredImage && (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden mt-2 mb-4">
                      <Image
                        src={formData.featuredImage}
                        alt="Featured"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, featuredImage: '' }))
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-4">
                    {formData.featuredImage
                      ? 'Click on an image below to change'
                      : 'Select an image from uploaded media'}
                  </p>
                </div>

                <div>
                  <Label>Upload Media</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mt-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="media-upload"
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {isUploading ? 'Uploading...' : 'Click to upload media'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {uploadedMedia.length > 0 && (
                  <div>
                    <Label>Uploaded Media</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2 max-h-96 overflow-y-auto">
                      {uploadedMedia.map((media, idx) => (
                        <div key={idx} className="relative group">
                          <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
                            {media.type === 'image' ? (
                              <Image
                                src={media.url}
                                alt={media.caption || 'Media'}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <Video className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                            <button
                              onClick={() => insertMediaToContent(media.url, media.type)}
                              className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                              title="Insert to content"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            {media.type === 'image' && (
                              <button
                                onClick={() => setFeaturedImage(media.url)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded"
                                title="Set as featured"
                              >
                                <ImageIcon className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setUploadedMedia((prev) =>
                                  prev.filter((_, i) => i !== idx)
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                              title="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-4">
                <div>
                  <Label>Image Gallery</Label>
                  <p className="text-sm text-gray-600 mt-1 mb-4">
                    Add images to create a gallery for this post
                  </p>

                  {galleryImages.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm mb-3">Gallery Images</h4>
                      <div className="grid grid-cols-4 gap-3">
                        {galleryImages.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={url}
                                alt={`Gallery ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeFromGallery(url)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm">Available Images</Label>
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      Click on images to add them to the gallery
                    </p>
                    <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto border rounded-lg p-3">
                      {uploadedMedia
                        .filter((m) => m.type === 'image')
                        .map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => addToGallery(media.url)}
                            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                              galleryImages.includes(media.url)
                                ? 'border-green-500 ring-2 ring-green-300'
                                : 'border-gray-200 hover:border-green-400'
                            }`}
                          >
                            <Image
                              src={media.url}
                              alt={media.caption || 'Media'}
                              fill
                              className="object-cover"
                            />
                            {galleryImages.includes(media.url) && (
                              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                <div className="bg-green-500 text-white rounded-full p-1">
                                  <Plus className="h-4 w-4" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Upload images in the Media tab first, then add them to the gallery here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {saveError}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingPostId ? 'Update' : 'Create'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {post.featuredImage && (
                  <div className="relative h-32 w-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <Badge variant={post.published ? 'default' : 'secondary'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                    {post.category && <Badge variant="outline">{post.category}</Badge>}
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                  )}
                  {post.galleryImages && post.galleryImages.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Grid className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {post.galleryImages.length} images in gallery
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
}
