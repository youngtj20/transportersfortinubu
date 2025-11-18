'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, Loader2, X } from 'lucide-react';

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  category?: string;
  createdAt: string;
}

export function TrendingContent() {
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const fetchTrendingPosts = async () => {
    try {
      const response = await fetch('/api/posts?published=true&limit=5');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed top-24 right-4 w-80 bg-white rounded-lg shadow-lg p-6 border border-gray-200 z-40">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-24 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5" />
          <div>
            <h3 className="font-bold text-lg">Trending Now</h3>
            <p className="text-xs text-green-100">Latest updates from our movement</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="flex-shrink-0 text-white hover:bg-green-500 rounded-full p-1 transition-colors duration-200"
          title="Close trending content"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Posts List */}
      <div className="divide-y divide-gray-200">
        {posts.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
              {/* Post Number */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  {post.category && (
                    <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                      {post.category}
                    </Badge>
                  )}

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h4>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
        <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs">
          <Link href="/blog">
            View All Posts <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
