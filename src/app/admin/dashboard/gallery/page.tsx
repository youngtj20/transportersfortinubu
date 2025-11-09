'use client';

import { useState, useEffect } from 'react';
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
  Save,
  Loader2,
  Calendar,
  MapPin,
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

interface EventGallery {
  id?: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  eventDate: string;
  images: string[];
  published: boolean;
}

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState<EventGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<EventGallery>({
    title: '',
    slug: '',
    description: '',
    location: '',
    eventDate: '',
    images: [],
    published: false,
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/event-galleries');
      if (response.ok) {
        const data = await response.json();
        setGalleries(data);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setUploadedImages((prev) => [...prev, data.url]);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (e.currentTarget) e.currentTarget.value = '';
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
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
    if (!formData.title || !formData.slug || uploadedImages.length === 0) {
      setSaveError('Title, slug, and at least one image are required');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const url = editingGalleryId ? `/api/event-galleries/${editingGalleryId}` : '/api/event-galleries';
      const method = editingGalleryId ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        images: uploadedImages,
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
        await fetchGalleries();
        setIsDialogOpen(false);
        resetForm();
        setSaveError('');
      } else {
        const error = await response.json();
        setSaveError(error.error || 'Failed to save gallery');
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
      setSaveError('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (gallery: EventGallery) => {
    setEditingGalleryId(gallery.id || null);
    setFormData(gallery);
    setUploadedImages(gallery.images);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return;

    try {
      const response = await fetch(`/api/event-galleries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchGalleries();
      }
    } catch (error) {
      console.error('Error deleting gallery:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      location: '',
      eventDate: '',
      images: [],
      published: false,
    });
    setUploadedImages([]);
    setEditingGalleryId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Event Gallery Manager</h2>
          <p className="text-gray-600 mt-1">Create and manage beautiful event photo galleries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Gallery
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingGalleryId ? 'Edit Gallery' : 'Create New Gallery'}
              </DialogTitle>
              <DialogDescription>
                Create a beautiful photo gallery for your event
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-semibold">Gallery Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g., Stakeholder Meeting - Lagos"
                    className="mt-1"
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
                    placeholder="gallery-slug"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Describe the event..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      placeholder="Event location"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDate" className="text-sm font-semibold">Event Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, eventDate: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label className="text-sm font-semibold">Upload Photos *</Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {isUploading ? 'Uploading...' : 'Click to upload photos or drag and drop'}
                      </span>
                      <span className="text-xs text-gray-500">PNG, JPG, GIF up to 50MB each</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Uploaded Photos ({uploadedImages.length})</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {uploadedImages.map((image, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Photo ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publish */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, published: e.target.checked }))
                    }
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <Label htmlFor="published" className="cursor-pointer font-semibold text-gray-700">
                    Publish this gallery
                  </Label>
                </div>
              </div>

              {saveError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{saveError}</p>
                </div>
              )}
            </div>

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
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingGalleryId ? 'Update Gallery' : 'Create Gallery'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 gap-6">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-6">
                {gallery.images.length > 0 && (
                  <div className="relative h-48 w-48 flex-shrink-0">
                    <Image
                      src={gallery.images[0]}
                      alt={gallery.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                      {gallery.images.length}
                    </div>
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{gallery.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{gallery.slug}</p>
                    </div>
                    <Badge variant={gallery.published ? 'default' : 'secondary'} className="ml-2">
                      {gallery.published ? '🟢 Published' : '🔵 Draft'}
                    </Badge>
                  </div>

                  {gallery.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{gallery.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    {gallery.eventDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(gallery.eventDate).toLocaleDateString()}
                      </div>
                    )}
                    {gallery.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {gallery.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Grid className="h-4 w-4" />
                      {gallery.images.length} photos
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(gallery)}
                      className="hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(gallery.id!)}
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

      {galleries.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Grid className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No galleries yet</p>
          <p className="text-gray-500 text-sm">Create your first event gallery to get started!</p>
        </div>
      )}
    </div>
  );
}
