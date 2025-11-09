'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Bold,
  Italic,
  Underline,
  List,
  Link2,
  Code,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
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

export function AdvancedPostEditor() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  
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
    if (!editorRef.current) return;
    
    let html = '';
    if (type === 'image') {
      html = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
    } else {
      html = `<video width="100%" height="auto" controls style="margin: 10px 0;"><source src="${url}" type="video/mp4"></video>`;
    }
    
    editorRef.current.innerHTML += html;
    setFormData((prev) => ({
      ...prev,
      content: editorRef.current?.innerHTML || prev.content,
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

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
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
        content: editorRef.current?.innerHTML || formData.content,
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
    
    // Parse galleryImages if it's a string (from database)
    let parsedGalleryImages: string[] = [];
    if (post.galleryImages) {
      if (typeof post.galleryImages === 'string') {
        try {
          parsedGalleryImages = JSON.parse(post.galleryImages);
        } catch (e) {
          parsedGalleryImages = [];
        }
      } else if (Array.isArray(post.galleryImages)) {
        parsedGalleryImages = post.galleryImages;
      }
    }
    
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      published: post.published,
      category: post.category,
      tags: post.tags,
      galleryImages: parsedGalleryImages,
    });
    setGalleryImages(parsedGalleryImages);
    if (editorRef.current) {
      editorRef.current.innerHTML = post.content;
    }
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
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
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
          <h2 className="text-3xl font-bold text-gray-900">Advanced Post Editor</h2>
          <p className="text-gray-600 mt-1">Create and manage posts with rich text, images, videos, and galleries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingPostId ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
              <DialogDescription>
                Create a beautiful post with rich text, images, videos, and galleries
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title"
                      className="mt-1 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug" className="text-sm font-semibold">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="post-slug"
                      className="mt-1 border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-sm font-semibold">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    placeholder="Brief summary of the post"
                    rows={3}
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Rich Text Editor</Label>
                  
                  {/* Toolbar */}
                  <div className="bg-gray-100 border border-gray-300 rounded-t-lg p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => applyFormat('bold')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('italic')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('underline')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    <div className="border-l border-gray-300"></div>
                    <button
                      onClick={() => applyFormat('formatBlock', '<h1>')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Heading 1"
                    >
                      <Heading1 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('formatBlock', '<h2>')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Heading 2"
                    >
                      <Heading2 className="h-4 w-4" />
                    </button>
                    <div className="border-l border-gray-300"></div>
                    <button
                      onClick={() => applyFormat('insertUnorderedList')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('justifyLeft')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('justifyCenter')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Align Center"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('justifyRight')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Align Right"
                    >
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <div className="border-l border-gray-300"></div>
                    <button
                      onClick={() => applyFormat('createLink', prompt('Enter URL:') || '')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => applyFormat('formatBlock', '<pre>')}
                      className="p-2 hover:bg-gray-200 rounded transition"
                      title="Code"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full min-h-96 p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  />
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4 mt-4">
                <div>
                  <Label className="text-sm font-semibold">Featured Image</Label>
                  {formData.featuredImage && (
                    <div className="relative h-48 w-full rounded-lg overflow-hidden mt-2 mb-4 border-2 border-green-200">
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
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
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
                  <Label className="text-sm font-semibold">Upload Media</Label>
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center mt-2 bg-green-50 hover:bg-green-100 transition">
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
                        <Upload className="h-8 w-8 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {isUploading ? 'Uploading...' : 'Click to upload media or drag and drop'}
                        </span>
                        <span className="text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 50MB</span>
                      </div>
                    </label>
                  </div>
                </div>

                {uploadedMedia.length > 0 && (
                  <div>
                    <Label className="text-sm font-semibold">Uploaded Media</Label>
                    <div className="grid grid-cols-4 gap-3 mt-2 max-h-96 overflow-y-auto p-3 bg-gray-50 rounded-lg">
                      {uploadedMedia.map((media, idx) => (
                        <div key={idx} className="relative group">
                          <div className="relative h-28 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                            {media.type === 'image' ? (
                              <Image
                                src={media.url}
                                alt={media.caption || 'Media'}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                <Video className="h-8 w-8 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button
                              onClick={() => insertMediaToContent(media.url, media.type)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                              title="Insert to content"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            {media.type === 'image' && (
                              <button
                                onClick={() => setFeaturedImage(media.url)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
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
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
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
              <TabsContent value="gallery" className="space-y-4 mt-4">
                <div>
                  <Label className="text-sm font-semibold">Image Gallery</Label>
                  <p className="text-sm text-gray-600 mt-1 mb-4">
                    Add images to create a gallery for this post
                  </p>

                  {galleryImages.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm mb-3 text-gray-700">Gallery Images ({galleryImages.length})</h4>
                      <div className="grid grid-cols-5 gap-3">
                        {galleryImages.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden border-2 border-green-400">
                              <Image
                                src={url}
                                alt={`Gallery ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeFromGallery(url)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-semibold">Available Images</Label>
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      Click on images to add them to the gallery
                    </p>
                    <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto border-2 border-gray-300 rounded-lg p-3 bg-gray-50">
                      {uploadedMedia
                        .filter((m) => m.type === 'image')
                        .map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => addToGallery(media.url)}
                            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                              galleryImages.includes(media.url)
                                ? 'border-green-500 ring-2 ring-green-300 shadow-lg'
                                : 'border-gray-300 hover:border-green-400'
                            }`}
                          >
                            <Image
                              src={media.url}
                              alt={media.caption || 'Media'}
                              fill
                              className="object-cover"
                            />
                            {galleryImages.includes(media.url) && (
                              <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                                <div className="bg-green-600 text-white rounded-full p-1">
                                  <Plus className="h-4 w-4" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Upload images in the Media tab first, then add them to the gallery here. Gallery images will be displayed in a beautiful grid on your blog page.
                  </p>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      placeholder="News, Update, etc."
                      className="mt-1 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, tags: e.target.value }))
                      }
                      placeholder="tag1, tag2, tag3"
                      className="mt-1 border-gray-300"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, published: e.target.checked }))
                      }
                      className="w-5 h-5 text-green-600 rounded cursor-pointer"
                    />
                    <Label htmlFor="published" className="cursor-pointer font-semibold text-gray-700">
                      Publish this post immediately
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-8">
                    {formData.published
                      ? '✓ This post will be visible to everyone'
                      : '○ This post will be saved as a draft'}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Post Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Status:</strong> {formData.published ? '🟢 Published' : '🔵 Draft'}</p>
                    <p><strong>Category:</strong> {formData.category || 'Not set'}</p>
                    <p><strong>Tags:</strong> {formData.tags || 'Not set'}</p>
                    <p><strong>Gallery Images:</strong> {galleryImages.length}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {saveError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{saveError}</p>
              </div>
            )}

            <DialogFooter className="gap-2">
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
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingPostId ? 'Update Post' : 'Create Post'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-6">
                {post.featuredImage && (
                  <div className="relative h-48 w-48 flex-shrink-0">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{post.slug}</p>
                    </div>
                    <Badge variant={post.published ? 'default' : 'secondary'} className="ml-2">
                      {post.published ? '🟢 Published' : '🔵 Draft'}
                    </Badge>
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category && <Badge variant="outline">{post.category}</Badge>}
                    {post.galleryImages && post.galleryImages.length > 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Grid className="h-3 w-3 mr-1" />
                        {post.galleryImages.length} images
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                      className="hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id!)}
                      className="text-red-600 hover:bg-red-50"
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
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No posts yet</p>
          <p className="text-gray-500 text-sm">Create your first post to get started!</p>
        </div>
      )}
    </div>
  );
}
