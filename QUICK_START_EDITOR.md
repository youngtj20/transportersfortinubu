# Enhanced Page Editor - Quick Start Guide

## 5-Minute Setup

### Step 1: Update Database (1 minute)

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push
```

### Step 2: Create Uploads Directory (30 seconds)

```bash
mkdir -p public/uploads
```

### Step 3: Start Development Server (30 seconds)

```bash
npm run dev
```

### Step 4: Access the Editor (1 minute)

1. Go to `http://localhost:3000/admin`
2. Login with admin credentials
3. Navigate to Dashboard → Pages
4. Click "New Page" or edit existing page

---

## Creating Your First Page

### Step 1: Basic Information
1. Enter **Page Title** (e.g., "About Us")
2. Enter **URL Slug** (e.g., "about-us")
3. Click **Content** tab

### Step 2: Add Content
1. Use the toolbar to format text
2. Click **Bold**, **Italic**, **Heading 1** buttons
3. Add lists, quotes, and code blocks
4. Insert images and videos

### Step 3: Add Slides (Optional)
1. Click **Slides** tab
2. Click **Add Slide**
3. Enter slide title and content
4. Choose background type (color, image, gradient)
5. Customize text color and layout

### Step 4: Add Sections (Optional)
1. Click **Sections** tab
2. Select section type from dropdown
3. Enter section title and content
4. Choose layout (full, two-column, three-column)
5. Set background color

### Step 5: SEO Settings
1. Click **SEO** tab
2. Enter **Meta Title** (50-60 characters)
3. Enter **Meta Description** (150-160 characters)
4. Add **Featured Image** URL

### Step 6: Save & Publish
1. Click **Save** button
2. Toggle **Published** checkbox
3. Click **Save** again

---

## Common Tasks

### Adding an Image
1. Click **Image** button in toolbar
2. Enter image URL or upload file
3. Click **Add Image**

### Adding a YouTube Video
1. Click **Video** button in toolbar
2. Paste YouTube URL
3. Click **Add Video**

### Creating a Table
1. Click **Table** button in toolbar
2. Table appears in editor
3. Click cells to edit content

### Changing Text Color
1. Select text
2. Click color button in toolbar
3. Choose color from palette

### Highlighting Text
1. Select text
2. Click highlight color button
3. Choose highlight color

### Creating a List
1. Click **Bullet List** or **Ordered List** button
2. Type list items
3. Press Enter for new item

### Adding a Link
1. Select text
2. Click **Link** button
3. Enter URL
4. Click **Add Link**

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | Ctrl+B |
| Italic | Ctrl+I |
| Underline | Ctrl+U |
| Undo | Ctrl+Z |
| Redo | Ctrl+Y |

---

## Tips & Tricks

### Slide Backgrounds
- **Color**: Use hex codes like `#ffffff`
- **Image**: Use full URLs like `https://example.com/image.jpg`
- **Gradient**: Use CSS like `linear-gradient(45deg, #000, #fff)`

### SEO Best Practices
- Meta title: 50-60 characters
- Meta description: 150-160 characters
- Use descriptive headings
- Add alt text to images

### Content Organization
1. Start with hero slide
2. Add main content sections
3. Include testimonials
4. Add call-to-action
5. End with footer info

### Performance Tips
- Compress images before uploading
- Use WebP format when possible
- Limit slides to 5-10 per page
- Limit sections to 5-10 per page

---

## File Upload

### Supported Formats
- **Images**: JPEG, PNG, GIF, WebP
- **Videos**: MP4, WebM

### Size Limits
- **Maximum**: 50MB per file
- **Recommended**: 2-5MB for images, 10-30MB for videos

### Upload Steps
1. Click **Image** or **Video** button
2. Click **Upload File** in dialog
3. Select file from computer
4. Wait for upload to complete
5. Image/video appears in editor

---

## Preview & Publishing

### Preview Mode
1. Click **Preview** button (top right)
2. See how page looks
3. Click **Edit** to go back to editing

### Publishing
1. Toggle **Published** checkbox
2. Click **Save**
3. Page is now live

### Unpublishing
1. Uncheck **Published** checkbox
2. Click **Save**
3. Page is hidden from public

---

## Troubleshooting

### Page Won't Save
- Check all required fields are filled
- Verify slug is unique
- Check browser console for errors
- Try refreshing page

### Images Not Showing
- Verify image URL is correct
- Check image format is supported
- Try uploading instead of URL
- Check file size

### Videos Not Playing
- Verify YouTube URL format
- Check video is public
- Try different URL format
- Check browser console

### Upload Failed
- Check file size (max 50MB)
- Verify file format is supported
- Check internet connection
- Try again in a few seconds

---

## Next Steps

1. **Create Multiple Pages**
   - About page
   - Services page
   - Contact page
   - Blog posts

2. **Customize Slides**
   - Add company logo
   - Add team photos
   - Add testimonials
   - Add statistics

3. **Add Sections**
   - Text sections
   - Image galleries
   - Video sections
   - Call-to-action

4. **Optimize for SEO**
   - Add meta tags
   - Use keywords
   - Add internal links
   - Optimize images

5. **Publish & Share**
   - Make pages live
   - Share on social media
   - Monitor analytics
   - Get feedback

---

## Resources

- **Full Documentation**: See `EDITOR_FEATURES.md`
- **Setup Guide**: See `ENHANCED_EDITOR_SETUP.md`
- **API Reference**: See `ENHANCED_EDITOR_SETUP.md` (API Documentation section)

---

## Support

For issues or questions:
1. Check troubleshooting section
2. Review documentation
3. Check browser console for errors
4. Contact support team

---

## Video Tutorial

Coming soon! Check back for video tutorials on:
- Creating your first page
- Adding slides and sections
- Optimizing for SEO
- Publishing and sharing

---

Happy editing! 🚀
