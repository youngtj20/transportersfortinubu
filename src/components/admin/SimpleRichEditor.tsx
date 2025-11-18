'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Highlighter,
  Undo2,
  Redo2,
  Trash2,
  Upload,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const HIGHLIGHT_COLORS = [
  '#FBBF24', '#86EFAC', '#93C5FD', '#F472B6', '#D8B4FE', '#FCA5A5',
  '#FED7AA', '#DBEAFE', '#E9D5FF', '#FCE7F3', '#F0FDFA', '#FEF3C7',
];

const TEXT_COLORS = [
  '#000000', '#FFFFFF', '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#1F2937',
];

interface SimpleRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export function SimpleRichEditor({
  value,
  onChange,
  placeholder = 'Start typing your content...',
  onImageUpload,
}: SimpleRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [selectedBgColor, setSelectedBgColor] = useState('#FBBF24');

  // Initialize editor with value
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Capture changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleTextColor = (color: string) => {
    document.execCommand('foreColor', false, color);
    setSelectedTextColor(color);
    editorRef.current?.focus();
    handleInput();
  };

  const handleBgColor = (color: string) => {
    document.execCommand('backColor', false, color);
    setSelectedBgColor(color);
    editorRef.current?.focus();
    handleInput();
  };

  const handleAlign = (align: string) => {
    const alignMap: { [key: string]: string } = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull',
    };
    document.execCommand(alignMap[align], false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleAddLink = () => {
    if (!linkUrl) return;
    document.execCommand('createLink', false, linkUrl);
    setLinkUrl('');
    setLinkText('');
    setIsLinkDialogOpen(false);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHTML = (html: string) => {
    if (!editorRef.current) return;
    
    try {
      // Focus the editor first
      editorRef.current.focus();
      
      // Create a new paragraph to hold the content
      const paragraph = document.createElement('p');
      paragraph.innerHTML = html;
      
      // Append to editor
      editorRef.current.appendChild(paragraph);
      
      // Add a new line after the inserted content
      const newParagraph = document.createElement('p');
      newParagraph.innerHTML = '<br>';
      editorRef.current.appendChild(newParagraph);
      
      // Move cursor to the end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
      
      // Trigger input event to update state
      setTimeout(() => {
        handleInput();
      }, 0);
      
      console.log('HTML inserted successfully:', html);
    } catch (error) {
      console.error('Error inserting HTML:', error);
      alert('Failed to insert content. Please try again.');
    }
  };

  const handleAddImage = () => {
    if (!imageUrl) return;
    const img = `<img src="${imageUrl}" alt="${imageAlt || 'Image'}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
    insertHTML(img);
    setImageUrl('');
    setImageAlt('');
    setIsImageDialogOpen(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file || !onImageUpload) return;

    setIsUploading(true);
    try {
      const url = await onImageUpload(file);
      const img = `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
      insertHTML(img);
      setIsImageDialogOpen(false);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (e.currentTarget) e.currentTarget.value = '';
    }
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a YouTube URL or video ID');
      return;
    }

    let videoId = videoUrl.trim();
    
    // Try to extract video ID from various YouTube URL formats
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = videoUrl.match(youtubeRegex);
    
    if (match && match[1]) {
      videoId = match[1];
    } else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      // If it looks like a YouTube URL but regex didn't match, try to extract ID
      const urlObj = new URL(videoUrl);
      if (urlObj.searchParams.has('v')) {
        videoId = urlObj.searchParams.get('v') || videoId;
      } else if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      }
    }
    
    // Validate video ID (should be alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId) && !/^[a-zA-Z0-9_-]+$/.test(videoId)) {
      console.warn('Extracted video ID:', videoId);
    }

    const iframe = `<div style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 10px 0; border-radius: 8px; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    
    console.log('Inserting video with ID:', videoId);
    insertHTML(iframe);
    setVideoUrl('');
    setIsVideoDialogOpen(false);
  };

  const handleUndo = () => {
    document.execCommand('undo', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleRedo = () => {
    document.execCommand('redo', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      handleInput();
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-300 p-4 space-y-3 rounded-t-lg">
        {/* Row 1: Text Formatting */}
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('bold')}
              title="Bold (Ctrl+B)"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('italic')}
              title="Italic (Ctrl+I)"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Italic className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('underline')}
              title="Underline (Ctrl+U)"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('strikethrough')}
              title="Strikethrough"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>

            <div className="border-l border-gray-300 mx-1"></div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('formatBlock', '<code>')}
              title="Code"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>

          {/* Text Color */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                title="Text Color"
                className="h-8 px-2 hover:bg-green-100"
              >
                <Type className="h-4 w-4 mr-1" />
                <div
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: selectedTextColor }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="grid grid-cols-6 gap-2">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleTextColor(color)}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-600 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Background Color */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                title="Highlight Color"
                className="h-8 px-2 hover:bg-green-100"
              >
                <Highlighter className="h-4 w-4 mr-1" />
                <div
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: selectedBgColor }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="grid grid-cols-6 gap-2">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleBgColor(color)}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-600 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Row 2: Headings & Lists */}
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('formatBlock', '<h1>')}
              title="Heading 1"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Heading1 className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('formatBlock', '<h2>')}
              title="Heading 2"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Heading2 className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('formatBlock', '<h3>')}
              title="Heading 3"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('insertUnorderedList')}
              title="Bullet List"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('insertOrderedList')}
              title="Ordered List"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => applyFormat('formatBlock', '<blockquote>')}
              title="Blockquote"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Quote className="h-4 w-4" />
            </Button>
          </div>

          {/* Alignment */}
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAlign('left')}
              title="Align Left"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAlign('center')}
              title="Align Center"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAlign('right')}
              title="Align Right"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <AlignRight className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleAlign('justify')}
              title="Justify"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Row 3: Media & Links */}
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsLinkDialogOpen(true)}
                title="Add Link"
                className="h-8 w-8 p-0 hover:bg-green-100"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Link</DialogTitle>
                  <DialogDescription>Enter the URL</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">URL *</label>
                    <Input
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLink} className="bg-green-600 hover:bg-green-700">
                    Add Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsImageDialogOpen(true)}
                title="Add Image"
                className="h-8 w-8 p-0 hover:bg-green-100"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Image</DialogTitle>
                  <DialogDescription>Enter image URL or upload</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Image URL *</label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Alt Text</label>
                    <Input
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Image description"
                      className="mt-1"
                    />
                  </div>
                  {onImageUpload && (
                    <div>
                      <label className="text-sm font-medium">Or Upload Image</label>
                      <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center mt-1 bg-green-50 hover:bg-green-100 transition">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {isUploading ? 'Uploading...' : 'Click to upload'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddImage} className="bg-green-600 hover:bg-green-700">
                    Add Image
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVideoDialogOpen(true)}
                title="Add YouTube Video"
                className="h-8 w-8 p-0 hover:bg-green-100"
              >
                <Video className="h-4 w-4" />
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add YouTube Video</DialogTitle>
                  <DialogDescription>Enter YouTube URL or video ID</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">YouTube URL or Video ID *</label>
                    <Input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or dQw4w9WgXcQ"
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsVideoDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddVideo} className="bg-green-600 hover:bg-green-700">
                    Add Video
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* History */}
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm ml-auto">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleUndo}
              title="Undo"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Undo2 className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleRedo}
              title="Redo"
              className="h-8 w-8 p-0 hover:bg-green-100"
            >
              <Redo2 className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              title="Clear All"
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="w-full min-h-96 p-6 focus:outline-none text-gray-700 bg-white"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {!value && <span className="text-gray-400">{placeholder}</span>}
      </div>
    </div>
  );
}
