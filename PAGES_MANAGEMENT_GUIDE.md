# Pages Management Guide

## Overview
This guide explains how to manage all website pages from the admin dashboard, including the menu system.

## Menu Management (Fixed ✅)

### How Menu Items Now Work
The Navigation component has been updated to fetch menu items from the database instead of using hardcoded values.

**Steps to add a menu item:**
1. Go to Admin Dashboard → Menu Management
2. Click "Add Menu Item"
3. Fill in the details:
   - **Label**: Display name (e.g., "Email")
   - **URL**: Link destination (e.g., "mailto:info@example.com" or "/contact")
   - **Icon**: Icon name (home, users, target, flag, building, calendar, phone, mail, email)
   - **Order**: Position in menu (0 = first)
   - **Target**: _self (same window) or _blank (new window)
   - **Published**: Toggle to show/hide
4. Click "Create"

**The menu item will now appear in:**
- Desktop navigation (top menu bar)
- Mobile navigation (hamburger menu)

### Supported Icons
- home
- users
- target
- flag
- building
- calendar
- phone
- mail
- email

---

## Page Management

### Current Pages
The website has the following pages that can be managed:

1. **Home** (`/`) - Main landing page
2. **About** (`/about`) - About the movement
3. **Vision** (`/vision`) - Vision statement
4. **Mission** (`/mission`) - Mission statement
5. **Structure** (`/structure`) - Organizational structure
6. **Timeline** (`/timeline`) - Campaign timeline
7. **Contact** (`/contact`) - Contact page
8. **Objectives** (`/objectives`) - Campaign objectives

### How to Edit Pages

#### Option 1: Advanced Editor (Recommended)
1. Go to Admin Dashboard → Page Management
2. Click the **"Advanced Edit"** button on any page
3. Use the rich text editor to modify content
4. Add slides and sections as needed
5. Click "Save"

#### Option 2: Quick Edit
1. Go to Admin Dashboard → Page Management
2. Click the **"Edit"** button on any page
3. Modify basic fields (title, slug, content, meta tags)
4. Click "Update"

#### Option 3: Create New Page
1. Go to Admin Dashboard → Page Management
2. Click **"New Page (Advanced Editor)"**
3. Fill in all required fields
4. Click "Create"

### Page Fields

**Required Fields:**
- **Title**: Page title (displayed in browser tab and headers)
- **Slug**: URL path (e.g., "about" for /about)

**Optional Fields:**
- **Content**: Main page content (supports markdown)
- **Meta Title**: SEO title (for search engines)
- **Meta Description**: SEO description (for search engines)
- **Featured Image**: Hero image URL
- **Page Type**: Static or Dynamic
- **Template**: Default, Landing, or Blog
- **Published**: Toggle to publish/unpublish

### Creating a New Page

**Example: Creating an "Email" Page**

1. Go to Admin Dashboard → Page Management
2. Click "New Page (Advanced Editor)"
3. Fill in:
   - Title: "Email Us"
   - Slug: "email"
   - Content: "Contact us via email at info@example.com"
   - Published: ✓ (checked)
4. Click "Create"
5. The page will be available at `/email`

**Then add it to the menu:**
1. Go to Admin Dashboard → Menu Management
2. Click "Add Menu Item"
3. Fill in:
   - Label: "Email"
   - URL: "/email"
   - Icon: "mail"
   - Published: ✓ (checked)
4. Click "Create"

---

## Complete Workflow Example

### Scenario: Add "Email" Menu Item and Page

**Step 1: Create the Page**
- Admin Dashboard → Page Management → New Page
- Title: "Email Us"
- Slug: "email"
- Content: "For inquiries, email us at info@transportersfortinubu2027.org"
- Published: ✓
- Save

**Step 2: Add to Menu**
- Admin Dashboard → Menu Management → Add Menu Item
- Label: "Email"
- URL: "/email"
- Icon: "mail"
- Order: 7 (or desired position)
- Published: ✓
- Create

**Step 3: Verify**
- Refresh the website
- Check desktop navigation (top menu)
- Check mobile navigation (hamburger menu)
- Click the "Email" link to view the page

---

## Troubleshooting

### Menu Item Not Appearing

**Possible Causes:**
1. **Not Published**: Check if "Published" toggle is ON
2. **Wrong URL**: Verify the URL is correct (e.g., "/email" not "email")
3. **Cache Issue**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. **Page Not Created**: If linking to a page, ensure the page exists first

**Solution:**
1. Go to Menu Management
2. Click "Edit" on the menu item
3. Verify:
   - Published is checked ✓
   - URL is correct
   - Order is set properly
4. Save and refresh browser

### Page Not Showing Content

**Possible Causes:**
1. **Not Published**: Page is in draft mode
2. **Wrong Slug**: URL doesn't match the slug
3. **Missing Content**: Content field is empty

**Solution:**
1. Go to Page Management
2. Click "Advanced Edit" on the page
3. Verify:
   - Published is checked ✓
   - Content is filled in
   - Slug matches the URL
4. Save

---

## Best Practices

### Menu Organization
- Keep menu items in logical order (Order: 0, 1, 2, etc.)
- Use consistent icon names
- Keep labels short and descriptive
- Use "_blank" target for external links only

### Page Creation
- Use descriptive, SEO-friendly slugs (e.g., "contact-us" not "page1")
- Fill in meta title and description for SEO
- Add featured images for visual appeal
- Keep content organized with clear headings
- Publish pages before adding to menu

### Content Management
- Always save drafts before publishing
- Test links before publishing
- Use consistent formatting
- Keep content up-to-date
- Archive old pages instead of deleting

---

## API Endpoints (For Developers)

### Menu API
- `GET /api/menu` - Fetch all menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/[id]` - Update menu item
- `DELETE /api/menu/[id]` - Delete menu item

### Pages API
- `GET /api/pages` - Fetch all pages
- `POST /api/pages` - Create page
- `GET /api/pages/[id]` - Fetch specific page
- `PUT /api/pages/[id]` - Update page
- `DELETE /api/pages/[id]` - Delete page

---

## Summary

✅ **Menu System**: Fully dynamic - fetches from database
✅ **Page Management**: Full CRUD operations available
✅ **Admin Dashboard**: Complete interface for managing both
✅ **Navigation**: Automatically updates when menu items change

**To manage your website:**
1. Create/edit pages in Page Management
2. Add/edit menu items in Menu Management
3. Publish items to make them visible
4. Refresh browser to see changes
