'use client';

import { useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Palette,
  Type,
  Undo,
  Redo,
  Plus,
  Trash2,
  Eye,
  Save,
  Upload,
  FileVideo,
  Sliders,
  Highlighter,
  Copy,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  Grid3x3,
  Maximize2,
  Settings,
  Columns2,
  Columns3,
  LayoutGrid,
  Zap,
  Layers,
  Move,
  ChevronUp,
  ChevronDown,
  X,
  Info
} from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundType: 'color' | 'image' | 'gradient' | 'video';
  backgroundValue: string;
  textColor: string;
  layout: 'center' | 'left' | 'right' | 'full';
  order: number;
  imageUrl?: string;
  videoUrl?: string;
  overlayOpacity: number;
}

interface Section {
  id: string;
  type: 'text' | 'image' | 'video' | 'gallery' | 'cta' | 'testimonial' | 'stats';
  title: string;
  content: string;
  layout: 'full' | 'two-column' | 'three-column';
  backgroundColor: string;
  order: number;
  settings?: Record<string, any>;
}

interface PageData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  published: boolean;
  slides: Slide[];
  sections: Section[];
}

const EnhancedPageEditor = ({ page, onSave }: { page?: PageData; onSave: (page: PageData) => void }) => {
  const [pageData, setPageData] = useState<PageData>({
    id: page?.id,
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    metaTitle: page?.metaTitle || '',
    metaDescription: page?.metaDescription || '',
    featuredImage: page?.featuredImage || '',
    published: page?.published || false,
    slides: page?.slides || [],
    sections: page?.sections || []
  });

  const [slides, setSlides] = useState<Slide[]>(page?.slides || []);
  const [sections, setSections] = useState<Section[]>(page?.sections || []);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Image,
        TextAlign,
        TextStyle,
        Color,
        Highlight.configure({
          multicolor: true,
        }),
        Link,
        Underline,
        FontFamily,
      ],
      content: page?.content || '<p>Start typing...</p>',
      onUpdate: ({ editor: ed }) => {
        if (ed) {
          setPageData(prev => ({ ...prev, content: ed.getHTML() }));
        }
      },
      immediatelyRender: false,
    },
    []
  );

  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('Inter');

  const fonts = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  ];

  const colors = [
    '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#84cc16',
    '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#6b7280', '#a3a3a3'
  ];

  const highlightColors = [
    '#fef08a', '#fecaca', '#fca5a5', '#fbcfe8', '#f0abfc', '#e9d5ff',
    '#ddd6fe', '#c7d2fe', '#bfdbfe', '#bae6fd', '#a5f3fc', '#ccfbf1'
  ];

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setUploadProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (file.type.startsWith('image/')) {
              editor?.chain().focus().setImage({ src: response.url }).run();
            }
            setUploadStatus('success');
            setTimeout(() => setUploadStatus('idle'), 2000);
          }
        });

        xhr.addEventListener('error', () => {
          setUploadStatus('error');
          setTimeout(() => setUploadStatus('idle'), 2000);
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus('error');
      }
    }
  };

  const setLink = useCallback(() => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
    }
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  }, [editor, imageUrl]);

  const addVideo = useCallback(() => {
    if (videoUrl) {
      const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (match && match[1]) {
        editor?.chain().focus().setYouTubeVideo({ videoId: match[1] }).run();
      }
      setVideoUrl('');
    }
  }, [editor, videoUrl]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor?.chain().focus().deleteTable().run();
  }, [editor]);

  // Slide management
  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: `Slide ${slides.length + 1}`,
      content: '',
      backgroundType: 'color',
      backgroundValue: '#ffffff',
      textColor: '#000000',
      layout: 'center',
      order: slides.length,
      overlayOpacity: 0,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    setSlides(newSlides);
  };

  const deleteSlide = (index: number) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
    }
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < slides.length) {
      [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
      setSlides(newSlides);
      setCurrentSlide(newIndex);
    }
  };

  // Section management
  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: '',
      layout: 'full',
      backgroundColor: '#ffffff',
      order: sections.length,
      settings: {},
    };
    setSections([...sections, newSection]);
    setCurrentSection(sections.length);
  };

  const updateSection = (index: number, updates: Partial<Section>) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], ...updates };
    setSections(newSections);
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    if (currentSection >= newSections.length) {
      setCurrentSection(Math.max(0, newSections.length - 1));
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setSections(newSections);
      setCurrentSection(newIndex);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedPageData = {
        ...pageData,
        slides: slides,
        sections: sections
      };
      await onSave(updatedPageData);
    } finally {
      setIsSaving(false);
    }
  };

  const MenuBar = () => (
    <div className="border-b bg-white p-4 space-y-3 sticky top-0 z-10">
      {/* First Row - Basic Formatting */}
      <div className="flex flex-wrap gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'bg-blue-100 border-blue-300' : ''}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'bg-blue-100 border-blue-300' : ''}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'bg-blue-100 border-blue-300' : ''}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={editor?.isActive('strike') ? 'bg-blue-100 border-blue-300' : ''}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor?.isActive('heading', { level: 1 }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor?.isActive('heading', { level: 3 }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'bg-blue-100 border-blue-300' : ''}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive('orderedList') ? 'bg-blue-100 border-blue-300' : ''}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive('blockquote') ? 'bg-blue-100 border-blue-300' : ''}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={editor?.isActive('code') ? 'bg-blue-100 border-blue-300' : ''}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Second Row - Alignment and Media */}
      <div className="flex flex-wrap gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={editor?.isActive({ textAlign: 'left' }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={editor?.isActive({ textAlign: 'center' }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={editor?.isActive({ textAlign: 'right' }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          className={editor?.isActive({ textAlign: 'justify' }) ? 'bg-blue-100 border-blue-300' : ''}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" title="Add Link">
              <LinkIcon className="h-4 w-4 mr-1" />
              Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button onClick={setLink} className="w-full">
                Add Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" title="Add Image">
              <ImageIcon className="h-4 w-4 mr-1" />
              Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Image URL</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div>
                <Label>Or Upload File</Label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="w-full"
                />
              </div>
              <Button onClick={addImage} className="w-full">
                Add Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" title="Add Video">
              <Video className="h-4 w-4 mr-1" />
              Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add YouTube Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button onClick={addVideo} className="w-full">
                Add Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          onClick={addTable}
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4 mr-1" />
          Table
        </Button>

        {editor?.isActive('table') && (
          <Button
            variant="destructive"
            size="sm"
            onClick={deleteTable}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Table
          </Button>
        )}
      </div>

      {/* Third Row - Style Options */}
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={selectedFont} onValueChange={setSelectedFont}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-1 border rounded-lg p-1 bg-gray-50">
          {colors.map((color) => (
            <Button
              key={color}
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 rounded"
              style={{ backgroundColor: color, border: selectedColor === color ? '2px solid #000' : 'none' }}
              onClick={() => {
                setSelectedColor(color);
                editor?.chain().focus().setColor(color).run();
              }}
              title={`Color: ${color}`}
            />
          ))}
        </div>

        <div className="flex gap-1 border rounded-lg p-1 bg-gray-50">
          {highlightColors.map((color) => (
            <Button
              key={color}
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 rounded"
              style={{ backgroundColor: color }}
              onClick={() => editor?.chain().focus().toggleHighlight({ color }).run()}
              title={`Highlight: ${color}`}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const SlidePreview = ({ slide, index }: { slide: Slide; index: number }) => {
    let backgroundStyle: React.CSSProperties = {};

    if (slide.backgroundType === 'color') {
      backgroundStyle.backgroundColor = slide.backgroundValue;
    } else if (slide.backgroundType === 'image') {
      backgroundStyle.backgroundImage = `url(${slide.backgroundValue})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
    } else if (slide.backgroundType === 'gradient') {
      backgroundStyle.background = slide.backgroundValue;
    }

    if (slide.overlayOpacity > 0) {
      backgroundStyle.position = 'relative';
    }

    return (
      <div
        className="w-full h-48 rounded-lg border-2 border-gray-200 flex items-center justify-center text-white font-bold overflow-hidden relative"
        style={backgroundStyle}
      >
        {slide.overlayOpacity > 0 && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,' + slide.overlayOpacity / 100 + ')' }}
          />
        )}
        <div className="relative z-10 text-center">
          <p className="text-sm">{slide.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Enhanced Page Editor</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        {uploadStatus !== 'idle' && (
          <Alert className={uploadStatus === 'success' ? 'bg-green-50 border-green-200' : uploadStatus === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}>
            <AlertDescription className="flex items-center gap-2">
              {uploadStatus === 'uploading' && <Loader2 className="h-4 w-4 animate-spin" />}
              {uploadStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
              {uploadStatus === 'error' && <AlertCircle className="h-4 w-4 text-red-600" />}
              {uploadStatus === 'uploading' && `Uploading... ${Math.round(uploadProgress)}%`}
              {uploadStatus === 'success' && 'File uploaded successfully!'}
              {uploadStatus === 'error' && 'Upload failed. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={pageData.title}
                    onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={pageData.slug}
                    onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="enter-url-slug"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={pageData.published}
                    onChange={(e) => setPageData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Editor</CardTitle>
              </CardHeader>
              <CardContent>
                {!isPreview && <MenuBar />}
                <div className="min-h-[500px] border rounded-lg overflow-hidden bg-white">
                  <EditorContent
                    editor={editor}
                    className={`prose prose-lg max-w-none p-6 ${isPreview ? 'pointer-events-none' : ''}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Slides Tab */}
          <TabsContent value="slides" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Slides Manager</CardTitle>
                <Button onClick={addSlide} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slide
                </Button>
              </CardHeader>
              <CardContent>
                {slides.length === 0 ? (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      No slides yet. Click "Add Slide" to create your first slide.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                      {slides.map((slide, index) => (
                        <div
                          key={slide.id}
                          className={`cursor-pointer rounded-lg border-2 transition-all ${currentSlide === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
                          onClick={() => setCurrentSlide(index)}
                        >
                          <SlidePreview slide={slide} index={index} />
                          <p className="text-center text-sm font-medium mt-2">{slide.title}</p>
                        </div>
                      ))}
                    </div>

                    {slides[currentSlide] && (
                      <div className="space-y-4 border-t pt-4">
                        <div>
                          <Label htmlFor="slide-title">Slide Title</Label>
                          <Input
                            id="slide-title"
                            value={slides[currentSlide].title}
                            onChange={(e) => updateSlide(currentSlide, { title: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="slide-content">Slide Content</Label>
                          <textarea
                            id="slide-content"
                            className="w-full min-h-[150px] p-3 border rounded-lg"
                            value={slides[currentSlide].content}
                            onChange={(e) => updateSlide(currentSlide, { content: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bg-type">Background Type</Label>
                            <Select
                              value={slides[currentSlide].backgroundType}
                              onValueChange={(value: any) =>
                                updateSlide(currentSlide, { backgroundType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="color">Color</SelectItem>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="gradient">Gradient</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="bg-value">Background Value</Label>
                            <Input
                              id="bg-value"
                              value={slides[currentSlide].backgroundValue}
                              onChange={(e) => updateSlide(currentSlide, { backgroundValue: e.target.value })}
                              placeholder={
                                slides[currentSlide].backgroundType === 'color'
                                  ? '#ffffff'
                                  : slides[currentSlide].backgroundType === 'image'
                                    ? 'https://example.com/image.jpg'
                                    : 'linear-gradient(45deg, #000, #fff)'
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="text-color">Text Color</Label>
                            <Input
                              id="text-color"
                              type="color"
                              value={slides[currentSlide].textColor}
                              onChange={(e) => updateSlide(currentSlide, { textColor: e.target.value })}
                            />
                          </div>

                          <div>
                            <Label htmlFor="layout">Layout</Label>
                            <Select
                              value={slides[currentSlide].layout}
                              onValueChange={(value: any) =>
                                updateSlide(currentSlide, { layout: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                                <SelectItem value="full">Full Width</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Overlay Opacity: {slides[currentSlide].overlayOpacity}%</Label>
                          <Slider
                            value={[slides[currentSlide].overlayOpacity]}
                            onValueChange={(value) => updateSlide(currentSlide, { overlayOpacity: value[0] })}
                            min={0}
                            max={100}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSlide(currentSlide, 'up')}
                            disabled={currentSlide === 0}
                          >
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Move Up
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSlide(currentSlide, 'down')}
                            disabled={currentSlide === slides.length - 1}
                          >
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Move Down
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteSlide(currentSlide)}
                            disabled={slides.length === 1}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sections Manager</CardTitle>
                <div className="flex gap-2">
                  <Select onValueChange={(value: any) => addSection(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Add Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Section</SelectItem>
                      <SelectItem value="image">Image Section</SelectItem>
                      <SelectItem value="video">Video Section</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="cta">Call to Action</SelectItem>
                      <SelectItem value="testimonial">Testimonial</SelectItem>
                      <SelectItem value="stats">Statistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {sections.length === 0 ? (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      No sections yet. Select a section type to add one.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <div
                          key={section.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${currentSection === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                          onClick={() => setCurrentSection(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{section.title}</p>
                              <p className="text-sm text-gray-600">Type: {section.type}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveSection(index, 'up');
                                }}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveSection(index, 'down');
                                }}
                                disabled={index === sections.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSection(index);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {sections[currentSection] && (
                      <div className="space-y-4 border-t pt-4">
                        <div>
                          <Label htmlFor="section-title">Section Title</Label>
                          <Input
                            id="section-title"
                            value={sections[currentSection].title}
                            onChange={(e) => updateSection(currentSection, { title: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="section-content">Section Content</Label>
                          <textarea
                            id="section-content"
                            className="w-full min-h-[150px] p-3 border rounded-lg"
                            value={sections[currentSection].content}
                            onChange={(e) => updateSection(currentSection, { content: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="section-layout">Layout</Label>
                            <Select
                              value={sections[currentSection].layout}
                              onValueChange={(value: any) =>
                                updateSection(currentSection, { layout: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full">Full Width</SelectItem>
                                <SelectItem value="two-column">Two Column</SelectItem>
                                <SelectItem value="three-column">Three Column</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="section-bg">Background Color</Label>
                            <Input
                              id="section-bg"
                              type="color"
                              value={sections[currentSection].backgroundColor}
                              onChange={(e) => updateSection(currentSection, { backgroundColor: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={pageData.metaTitle}
                    onChange={(e) => setPageData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO meta title (50-60 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">{pageData.metaTitle?.length || 0} characters</p>
                </div>
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <textarea
                    id="meta-description"
                    className="w-full min-h-[100px] p-3 border rounded-lg"
                    value={pageData.metaDescription}
                    onChange={(e) => setPageData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO meta description (150-160 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">{pageData.metaDescription?.length || 0} characters</p>
                </div>
                <div>
                  <Label htmlFor="featured-image">Featured Image URL</Label>
                  <Input
                    id="featured-image"
                    value={pageData.featuredImage}
                    onChange={(e) => setPageData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Drag and drop images and videos here, or click to browse</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedPageEditor;
