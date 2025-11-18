'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Search, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface EventGallery {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location?: string;
  eventDate?: string;
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<EventGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGallery, setSelectedGallery] = useState<EventGallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 20;

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/event-galleries?published=true');
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

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = selectedGallery ? Math.ceil(selectedGallery.images.length / IMAGES_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const paginatedImages = selectedGallery ? selectedGallery.images.slice(startIndex, endIndex) : [];

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedGallery && selectedImageIndex !== null && selectedImageIndex < selectedGallery.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleOpenGallery = (gallery: EventGallery) => {
    setSelectedGallery(gallery);
    setSelectedImageIndex(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="text-white py-16" style={{ backgroundColor: 'rgb(0,159,86)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Gallery</h1>
          <p className="text-xl text-white/90">
            Explore photos from our campaigns, meetings, and events
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search events by title, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderBottomColor: 'rgb(0,159,86)' }}></div>
          </div>
        ) : filteredGalleries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleries.map((gallery) => (
              <Card 
                key={gallery.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => handleOpenGallery(gallery)}
              >
                {/* Gallery Preview Image */}
                {gallery.images.length > 0 && (
                  <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={gallery.images[0]}
                      alt={gallery.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Image Count Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {gallery.images.length} photos
                    </div>
                  </div>
                )}

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {gallery.title}
                  </h3>

                  {gallery.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {gallery.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    {gallery.eventDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" style={{ color: 'rgb(0,159,86)' }} />
                        {new Date(gallery.eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                    {gallery.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" style={{ color: 'rgb(0,159,86)' }} />
                        {gallery.location}
                      </div>
                    )}
                  </div>

                  <Button className="w-full text-white" style={{ backgroundColor: 'rgb(0,159,86)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(0, 130, 70)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(0,159,86)'}>
                    View Gallery
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No event galleries found</p>
          </div>
        )}
      </div>

      {/* Gallery Grid Modal */}
      {selectedGallery && selectedImageIndex === null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col p-4 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 sticky top-0 bg-black/95 pb-4 z-10">
            <div className="text-white flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedGallery.title}</h2>
              {selectedGallery.description && (
                <p className="text-gray-300 mb-3">{selectedGallery.description}</p>
              )}
              <div className="flex flex-wrap gap-6 text-sm">
                {selectedGallery.eventDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedGallery.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
                {selectedGallery.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedGallery.location}
                  </div>
                )}
                <div className="text-gray-400">
                  {selectedGallery.images.length} photos
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedGallery(null)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition flex-shrink-0"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto w-full mb-8">
            {paginatedImages.map((image, index) => {
              const actualIndex = startIndex + index;
              return (
                <div
                  key={actualIndex}
                  className="relative h-40 md:h-48 rounded-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
                  onClick={() => setSelectedImageIndex(actualIndex)}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${actualIndex + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-sm font-semibold">{actualIndex + 1} / {selectedGallery.images.length}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-8 sticky bottom-0 bg-black/95 py-4">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <div className="text-white text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Lightbox View for Selected Image */}
      {selectedGallery && selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Main Image */}
            <div className="relative h-96 md:h-[600px] w-full rounded-lg overflow-hidden">
              <Image
                src={selectedGallery.images[selectedImageIndex]}
                alt={`${selectedGallery.title} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation Buttons */}
              {selectedGallery.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    disabled={selectedImageIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 disabled:opacity-50 text-white p-3 rounded-full transition"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextImage}
                    disabled={selectedImageIndex === selectedGallery.images.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 disabled:opacity-50 text-white p-3 rounded-full transition"
                  >
                    →
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {selectedGallery.images.length}
              </div>
            </div>

            {/* Back to Grid Button */}
            <div className="text-center mt-6">
              <Button
                onClick={() => setSelectedImageIndex(null)}
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                Back to Grid
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
