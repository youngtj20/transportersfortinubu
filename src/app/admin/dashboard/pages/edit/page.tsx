'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import EnhancedPageEditor from '@/components/admin/EnhancedPageEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface PageData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  published: boolean;
  slides: any[];
  sections: any[];
}

export default function EditPagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pageId = searchParams.get('id');

  const [page, setPage] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pageId) {
      fetchPage();
    } else {
      setIsLoading(false);
    }
  }, [pageId]);

  const fetchPage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/pages/${pageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }
      const data = await response.json();
      setPage(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load page';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (pageData: PageData) => {
    try {
      const url = pageId ? `/api/pages/${pageId}` : '/api/pages';
      const method = pageId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save page');
      }

      const savedPage = await response.json();
      setPage(savedPage);

      toast({
        title: 'Success',
        description: pageId ? 'Page updated successfully' : 'Page created successfully',
      });

      if (!pageId) {
        router.push(`/admin/dashboard/pages/edit?id=${savedPage.id}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save page';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading page editor...</p>
        </div>
      </div>
    );
  }

  if (error && pageId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <EnhancedPageEditor
      page={page || undefined}
      onSave={handleSave}
    />
  );
}
