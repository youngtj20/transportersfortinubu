'use client';

import { useEffect } from 'react';

export function FaviconLoader() {
  useEffect(() => {
    const loadFavicon = async () => {
      try {
        const response = await fetch('/api/favicon');
        if (response.ok) {
          const data = await response.json();
          const faviconUrl = data.faviconUrl || '/favicon.ico';
          
          // Update or create favicon link element
          let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
          
          if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
          }
          
          // Set the href with cache busting
          faviconLink.href = `${faviconUrl}?t=${Date.now()}`;
          
          // Also update apple touch icon if available
          let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
          if (!appleTouchIcon) {
            appleTouchIcon = document.createElement('link');
            appleTouchIcon.rel = 'apple-touch-icon';
            document.head.appendChild(appleTouchIcon);
          }
          appleTouchIcon.href = `${faviconUrl}?t=${Date.now()}`;
        }
      } catch (error) {
        console.error('Error loading favicon:', error);
      }
    };

    loadFavicon();
  }, []);

  return null;
}
