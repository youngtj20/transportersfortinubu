# Enhanced Page Editor - Setup & Implementation Guide

## Overview

The Enhanced Page Editor is a powerful, feature-rich content management system for creating and managing pages with advanced formatting, multimedia support, slides, and dynamic sections.

## Installation & Setup

### 1. Database Migration

First, update your database schema to support the new features:

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push
```

This will add the following fields to the `pages` table:
- `slides` - JSON array of slide data
- `sections` - JSON array of section data

### 2. Create Uploads Directory

The editor needs a directory for file uploads:

```bash
mkdir -p public/uploads
```

Make sure the directory is writable by the Node.js process.

### 3. Environment Configuration

Ensure your `.env` file has the correct settings:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 4. Install Dependencies

All required dependencies are already in `package.json`. If you need to add them manually:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-youtube @tiptap/extension-highlight @tiptap/extension-character-count
```

---

## File Structure

### New Components
```
src/components/admin/
├── AdvancedPageEditor.tsx      # Original editor (kept for reference)
└── EnhancedPageEditor.tsx      # New enhanced editor
```

### New API Routes
```
src/app/api/
├── pages/
│   ├── route.ts                # GET/POST pages
│   └── [id]/route.ts           # GET/PUT/DELETE specific page
└── upload/
    └── route.ts                # POST file uploads
```

### New Pages
```
src/app/admin/dashboard/pages/
└── edit/
    └── page.tsx                # Page editor interface
```

---

## Usage

### Accessing the Editor

1. **Create New Page**
   - Navigate to `/admin/dashboard/pages`
   - Click "New Page" button
   - Opens editor at `/admin/dashboard/pages/edit`

2. **Edit Existing Page**
   - Navigate to `/admin/dashboard/pages`
   - Click edit icon on page
   - Opens editor with page data

### Basic Workflow

1. **Enter Page Details**
   - Title: Page name
   - Slug: URL path (e.g., "about-us")
   - Published: Toggle visibility

2. **Add Content**
   - Use rich text editor for main content
   - Add formatting, links, images, videos
   - Insert tables for data

3. **Create Slides** (Optional)
   - Click "Add Slide" in Slides tab
   - Customize slide content and background
   - Reorder slides as needed

4. **Add Sections** (Optional)
   - Select section type in Sections tab
   - Configure section layout and content
   - Reorder sections as needed

5. **SEO Optimization**
   - Add meta title (50-60 characters)
   - Add meta description (150-160 characters)
   - Set featured image

6. **Save & Publish**
   - Click "Save" button
   - Toggle "Published" to make live

---

## API Documentation

### Pages API

#### Get All Pages
```bash
GET /api/pages
```

Response:
```json
[
  {
    "id": "cuid",
    "title": "Page Title",
    "slug": "page-slug",
    "content": "<p>HTML content</p>",
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description",
    "featuredImage": "https://...",
    "published": true,
    "slides": [],
    "sections": [],
    "author": { "name": "Admin", "email": "admin@example.com" },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Single Page
```bash
GET /api/pages/[id]
```

#### Create Page
```bash
POST /api/pages
Content-Type: application/json

{
  "title": "Page Title",
  "slug": "page-slug",
  "content": "<p>HTML content</p>",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "featuredImage": "https://...",
  "published": true,
  "slides": [
    {
      "id": "slide-1",
      "title": "Slide 1",
      "content": "Slide content",
      "backgroundType": "color",
      "backgroundValue": "#ffffff",
      "textColor": "#000000",
      "layout": "center",
      "overlayOpacity": 0
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "type": "text",
      "title": "Section Title",
      "content": "Section content",
      "layout": "full",
      "backgroundColor": "#ffffff"
    }
  ]
}
```

#### Update Page
```bash
PUT /api/pages/[id]
Content-Type: application/json

{
  // Same as POST
}
```

#### Delete Page
```bash
DELETE /api/pages/[id]
```

### Upload API

#### Upload File
```bash
POST /api/upload
Content-Type: multipart/form-data

FormData: {
  file: File
}
```

Response:
```json
{
  "success": true,
  "url": "/uploads/uuid.jpg",
  "media": {
    "id": "cuid",
    "filename": "uuid.jpg",
    "originalName": "image.jpg",
    "mimeType": "image/jpeg",
    "size": 102400,
    "path": "/uploads/uuid.jpg",
    "url": "/uploads/uuid.jpg",
    "alt": "image",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Media Library
```bash
GET /api/upload
```

---

## Data Structure

### Slide Object
```typescript
interface Slide {
  id: string;                    // Unique identifier
  title: string;                 // Slide title
  content: string;               // Slide content
  backgroundType: 'color' | 'image' | 'gradient' | 'video';
  backgroundValue: string;       // Color hex, image URL, or gradient CSS
  textColor: string;             // Text color hex
  layout: 'center' | 'left' | 'right' | 'full';
  order: number;                 // Display order
  imageUrl?: string;             // Optional image URL
  videoUrl?: string;             // Optional video URL
  overlayOpacity: number;        // 0-100 overlay opacity
}
```

### Section Object
```typescript
interface Section {
  id: string;                    // Unique identifier
  type: 'text' | 'image' | 'video' | 'gallery' | 'cta' | 'testimonial' | 'stats';
  title: string;                 // Section title
  content: string;               // Section content
  layout: 'full' | 'two-column' | 'three-column';
  backgroundColor: string;       // Background color hex
  order: number;                 // Display order
  settings?: Record<string, any>; // Custom settings
}
```

### Page Object
```typescript
interface PageData {
  id?: string;                   // Optional for new pages
  title: string;                 // Page title
  slug: string;                  // URL slug
  content: string;               // Main content (HTML)
  metaTitle?: string;            // SEO meta title
  metaDescription?: string;      // SEO meta description
  featuredImage?: string;        // Featured image URL
  published: boolean;            // Publication status
  slides: Slide[];               // Array of slides
  sections: Section[];           // Array of sections
}
```

---

## Features Breakdown

### 1. Rich Text Editor
- **Formatting**: Bold, italic, underline, strikethrough
- **Headings**: H1, H2, H3
- **Lists**: Bullet and ordered lists
- **Alignment**: Left, center, right, justify
- **Colors**: 18 text colors, 12 highlight colors
- **Fonts**: 6 professional fonts
- **Tables**: Insert and manage tables
- **Links**: Add hyperlinks
- **Undo/Redo**: Full undo/redo support

### 2. Media Management
- **Image Upload**: Direct file upload
- **Image URL**: Add images from URL
- **Video Embedding**: YouTube video support
- **File Validation**: Type and size checking
- **Progress Tracking**: Upload progress indicator
- **Media Library**: View all uploaded files

### 3. Slides System
- **Unlimited Slides**: Create as many slides as needed
- **Customization**: Title, content, background, layout
- **Background Types**: Color, image, gradient, video
- **Overlay**: Add dark overlay for text readability
- **Reordering**: Move slides up/down
- **Preview**: Visual slide thumbnails

### 4. Sections System
- **Multiple Types**: Text, image, video, gallery, CTA, testimonial, stats
- **Layouts**: Full width, two-column, three-column
- **Customization**: Title, content, background color
- **Reordering**: Move sections up/down
- **Management**: Add, edit, delete sections

### 5. SEO Optimization
- **Meta Tags**: Title and description
- **Character Counter**: Real-time character count
- **Featured Image**: Set page featured image
- **Best Practices**: Recommended character limits

### 6. Preview Mode
- **Live Preview**: See page as it will appear
- **Edit Toggle**: Switch between edit and preview
- **Responsive**: Check different screen sizes

---

## Security Considerations

### Authentication
- All endpoints require admin authentication
- Uses NextAuth.js for session management
- JWT-based token validation

### File Upload Security
- File type validation (whitelist)
- File size limits (50MB max)
- Unique filename generation (UUID)
- Stored in public directory

### Data Validation
- Required field validation
- Slug uniqueness checking
- HTML sanitization (via TipTap)
- Input type checking

### Best Practices
1. Always validate user input
2. Check authentication before operations
3. Sanitize HTML content
4. Use HTTPS in production
5. Implement rate limiting
6. Regular security audits

---

## Performance Optimization

### Frontend
- Lazy loading for images
- Debounced auto-save
- Efficient re-renders
- Code splitting

### Backend
- Database indexing on slug
- Query optimization
- File compression
- Caching strategies

### Content
- Image optimization
- Video compression
- Lazy loading
- CDN integration

---

## Troubleshooting

### Upload Issues
**Problem**: Files not uploading
- Check file size (max 50MB)
- Verify file type is supported
- Check uploads directory permissions
- Review browser console for errors

**Solution**:
```bash
# Fix permissions
chmod 755 public/uploads
```

### Database Issues
**Problem**: Slides/sections not saving
- Run database migration
- Check database connection
- Verify schema is updated

**Solution**:
```bash
npm run db:push
npm run db:generate
```

### Editor Issues
**Problem**: Content not displaying
- Clear browser cache
- Check HTML validity
- Verify image URLs
- Check console for errors

---

## Customization

### Adding Custom Fonts
Edit `EnhancedPageEditor.tsx`:
```typescript
const fonts = [
  { name: 'Custom Font', value: 'CustomFont, sans-serif' },
  // Add more fonts
];
```

### Adding Custom Colors
Edit `EnhancedPageEditor.tsx`:
```typescript
const colors = [
  '#custom-color',
  // Add more colors
];
```

### Adding Custom Section Types
Edit `EnhancedPageEditor.tsx`:
```typescript
const addSection = (type: Section['type']) => {
  // Add custom type handling
};
```

---

## Deployment

### Production Checklist
- [ ] Database migrated
- [ ] Uploads directory created
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] File upload limits configured
- [ ] Backup strategy in place
- [ ] Security headers configured
- [ ] Rate limiting enabled

### Deployment Steps
1. Push code to production
2. Run database migrations
3. Create uploads directory
4. Set environment variables
5. Restart application
6. Test editor functionality

---

## Support & Resources

- **Documentation**: See `EDITOR_FEATURES.md`
- **API Reference**: See API Documentation section
- **Troubleshooting**: See Troubleshooting section
- **Code Examples**: See Usage section

---

## Version History

### v1.0 (Current)
- Rich text editing with TipTap
- Image and video support
- Slides manager with customization
- Sections manager with multiple types
- SEO optimization
- Media library
- File upload with progress
- Preview mode
- Full CRUD operations

---

## Future Enhancements

- [ ] AI-powered content suggestions
- [ ] Template library
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] Multi-language support
- [ ] Version history/rollback
- [ ] Collaboration features
- [ ] Custom CSS support
- [ ] Scheduled publishing
- [ ] Content approval workflow
