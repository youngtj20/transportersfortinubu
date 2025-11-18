'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection, $isRangeSelection, $createTextNode, $insertNodes, $createParagraphNode } from 'lexical';
import { useState, useCallback, useEffect } from 'react';
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
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $createListItemNode, $createListNode, ListNode, ListItemNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { $createLinkNode, LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

const HIGHLIGHT_COLORS = [
  '#FBBF24', '#86EFAC', '#93C5FD', '#F472B6', '#D8B4FE', '#FCA5A5',
];

interface LexicalEditorV2Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

function ToolbarPlugin({
  onImageUpload,
}: {
  onImageUpload?: (file: File) => Promise<string>;
}) {
  const [editor] = useLexicalComposerContext();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFormat = useCallback(
    (format: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          switch (format) {
            case 'bold':
              selection.toggleFormat('bold');
              break;
            case 'italic':
              selection.toggleFormat('italic');
              break;
            case 'underline':
              selection.toggleFormat('underline');
              break;
            case 'strikethrough':
              selection.toggleFormat('strikethrough');
              break;
            case 'code':
              selection.toggleFormat('code');
              break;
          }
        }
      });
    },
    [editor]
  );

  const handleHeading = useCallback(
    (level: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach((node) => {
            const parent = node.getParent();
            if (parent) {
              const heading = $createHeadingNode(level);
              heading.append(...parent.getChildren());
              parent.replace(heading);
            }
          });
        }
      });
    },
    [editor]
  );

  const handleAddLink = useCallback(() => {
    if (!linkUrl) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const linkNode = $createLinkNode(linkUrl);
        linkNode.append($createTextNode(linkText || linkUrl));
        selection.insertNodes([linkNode]);
      }
    });

    setLinkUrl('');
    setLinkText('');
    setIsLinkDialogOpen(false);
  }, [editor, linkUrl, linkText]);

  const handleAddImage = useCallback(() => {
    if (!imageUrl) return;

    editor.update(() => {
      const paragraph = $createParagraphNode();
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt || 'Image'}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
      paragraph.append($createTextNode(imgHtml));
      $insertNodes([paragraph]);
    });

    setImageUrl('');
    setImageAlt('');
    setIsImageDialogOpen(false);
  }, [editor, imageUrl, imageAlt]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (!file || !onImageUpload) return;

      setIsUploading(true);
      try {
        const url = await onImageUpload(file);
        editor.update(() => {
          const paragraph = $createParagraphNode();
          const imgHtml = `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
          paragraph.append($createTextNode(imgHtml));
          $insertNodes([paragraph]);
        });
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setIsUploading(false);
        if (e.currentTarget) e.currentTarget.value = '';
      }
    },
    [editor, onImageUpload]
  );

  const handleAddVideo = useCallback(() => {
    if (!videoUrl) return;

    let videoId = videoUrl;
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = videoUrl.match(youtubeRegex);
    if (match) {
      videoId = match[1];
    }

    editor.update(() => {
      const paragraph = $createParagraphNode();
      const iframeHtml = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin: 10px 0; border-radius: 8px;"></iframe>`;
      paragraph.append($createTextNode(iframeHtml));
      $insertNodes([paragraph]);
    });

    setVideoUrl('');
    setIsVideoDialogOpen(false);
  }, [editor, videoUrl]);

  const handleUndo = useCallback(() => {
    editor.dispatchCommand('UNDO_COMMAND' as any, undefined);
  }, [editor]);

  const handleRedo = useCallback(() => {
    editor.dispatchCommand('REDO_COMMAND' as any, undefined);
  }, [editor]);

  const handleClear = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
  }, [editor]);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-300 p-4 space-y-3 rounded-t-lg">
      <div className="flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleFormat('bold')}
            title="Bold (Ctrl+B)"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleFormat('italic')}
            title="Italic (Ctrl+I)"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleFormat('underline')}
            title="Underline (Ctrl+U)"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleFormat('strikethrough')}
            title="Strikethrough"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="border-l border-gray-300 mx-1"></div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                title="Highlight Color"
                className="h-8 w-8 p-0 hover:bg-green-100"
              >
                <Highlighter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3">
              <div className="grid grid-cols-6 gap-2">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                          selection.setStyle(`background-color: ${color}`);
                        }
                      });
                    }}
                    className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-600 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Headings */}
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleHeading('h1')}
            title="Heading 1"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Heading1 className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleHeading('h2')}
            title="Heading 2"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Heading2 className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleHeading('h3')}
            title="Heading 3"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              editor.update(() => {
                const listNode = $createListNode('bullet');
                const itemNode = $createListItemNode();
                itemNode.append($createTextNode(''));
                listNode.append(itemNode);
                $insertNodes([listNode]);
              });
            }}
            title="Bullet List"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              editor.update(() => {
                const listNode = $createListNode('number');
                const itemNode = $createListItemNode();
                itemNode.append($createTextNode(''));
                listNode.append(itemNode);
                $insertNodes([listNode]);
              });
            }}
            title="Ordered List"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              editor.update(() => {
                const quoteNode = $createQuoteNode();
                quoteNode.append($createTextNode(''));
                $insertNodes([quoteNode]);
              });
            }}
            title="Blockquote"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleFormat('code')}
            title="Code"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Media */}
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
                <DialogDescription>Enter the URL and optional link text</DialogDescription>
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
                <div>
                  <label className="text-sm font-medium">Link Text</label>
                  <Input
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Click here"
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
                <DialogDescription>Enter image URL or upload from your device</DialogDescription>
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
                <DialogDescription>Enter the YouTube video URL or video ID</DialogDescription>
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
  );
}

function ContentSyncPlugin({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor with HTML value
  useEffect(() => {
    if (!isInitialized && value) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        // Parse HTML and insert as text nodes to preserve HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = value;

        Array.from(tempDiv.childNodes).forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(element.outerHTML));
            root.append(paragraph);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(node.textContent));
            root.append(paragraph);
          }
        });
      });
      setIsInitialized(true);
    }
  }, [editor, value, isInitialized]);

  // Capture changes and export as HTML
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        let html = '';

        root.getChildren().forEach((node) => {
          const text = node.getTextContent();

          // If text contains HTML tags, preserve them
          if (text.includes('<') && text.includes('>')) {
            html += text;
          } else if (node.getType() === 'paragraph') {
            const paragraph = node as any;
            const children = paragraph.getChildren();
            let content = '';

            children.forEach((child: any) => {
              const childText = child.getTextContent();
              const format = child.getFormat?.();

              if (childText.includes('<') && childText.includes('>')) {
                content += childText;
              } else if (format?.bold) {
                content += `<strong>${childText}</strong>`;
              } else if (format?.italic) {
                content += `<em>${childText}</em>`;
              } else if (format?.underline) {
                content += `<u>${childText}</u>`;
              } else if (format?.strikethrough) {
                content += `<s>${childText}</s>`;
              } else {
                content += childText;
              }
            });

            if (content) {
              html += `<p>${content}</p>`;
            }
          } else if (node.getType() === 'heading') {
            const heading = node as any;
            const level = heading.getTag();
            html += `<${level}>${text}</${level}>`;
          } else if (node.getType() === 'list') {
            const list = node as any;
            const tag = list.getListType() === 'bullet' ? 'ul' : 'ol';
            html += `<${tag}>`;

            list.getChildren().forEach((item: any) => {
              html += `<li>${item.getTextContent()}</li>`;
            });

            html += `</${tag}>`;
          } else if (node.getType() === 'quote') {
            html += `<blockquote>${text}</blockquote>`;
          }
        });

        onChange(html);
      });
    });
  }, [editor, onChange]);

  return null;
}

export function LexicalEditorV2({
  value,
  onChange,
  placeholder = 'Start typing your content...',
  onImageUpload,
}: LexicalEditorV2Props) {
  const initialConfig = {
    namespace: 'LexicalEditorV2',
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode],
    theme: {
      paragraph: 'mb-4',
      heading: {
        h1: 'text-4xl font-bold mb-4 text-gray-900',
        h2: 'text-3xl font-bold mb-3 text-gray-800',
        h3: 'text-2xl font-bold mb-2 text-gray-700',
      },
      list: {
        nested: { listitem: 'list-none' },
        ol: 'list-decimal list-inside mb-4 text-gray-700',
        ul: 'list-disc list-inside mb-4 text-gray-700',
        listitem: 'mb-2',
      },
      quote: 'border-l-4 border-green-600 pl-4 italic text-gray-600 mb-4 bg-gray-50 py-2 pr-4',
      code: 'bg-gray-200 px-2 py-1 rounded font-mono text-sm text-gray-800',
      codeBlock: 'bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto',
      link: 'text-green-600 underline cursor-pointer hover:text-green-700',
    },
    onError: (error: Error) => console.error('Lexical error:', error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
        <ToolbarPlugin onImageUpload={onImageUpload} />
        <div className="relative bg-white">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="prose prose-sm max-w-none p-6 min-h-96 focus:outline-none text-gray-700" />
            }
            placeholder={
              <div className="absolute top-6 left-6 text-gray-400 pointer-events-none text-base">
                {placeholder}
              </div>
            }
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ContentSyncPlugin value={value} onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
