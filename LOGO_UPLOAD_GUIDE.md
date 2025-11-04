# Logo Upload Guide

## 🎯 Overview

You can now upload your logo directly from the admin dashboard. The logo will be properly aligned and displayed in the website navigation.

---

## 📋 How to Upload Logo

### Step 1: Go to Admin Dashboard
```
http://localhost:3000/admin/dashboard
```

### Step 2: Click Settings
- Click **"Settings"** in the sidebar
- Or go to: `http://localhost:3000/admin/dashboard/settings`

### Step 3: Go to General Tab
- Click the **"General"** tab (should be selected by default)

### Step 4: Upload Logo
1. Scroll down to the **"Logo"** section
2. Click **"Upload Logo"** button
3. Select your logo image file
4. Wait for upload to complete
5. You'll see a preview of your logo

### Step 5: Save Changes
1. Click **"Save Changes"** button at the top
2. Your logo is now saved!

### Step 6: Verify
- Go to website homepage: `http://localhost:3000`
- Your logo should appear in the navigation

---

## 🎨 Logo Specifications

### Recommended Format
- **File Type**: PNG or SVG
- **Size**: Max 5MB
- **Background**: Transparent (PNG) or SVG
- **Dimensions**: 200x100px or similar aspect ratio

### Best Practices
- Use PNG with transparent background for best results
- SVG files are ideal for scalability
- Keep file size under 1MB for faster loading
- Use a logo that looks good at different sizes

### Example Dimensions
- **Small**: 150x75px
- **Medium**: 200x100px
- **Large**: 300x150px

---

## 🖼️ Logo Preview

After uploading, you'll see:
- A preview box showing your logo
- An **X** button to remove the logo
- The logo URL saved in the system

---

## 🔧 Logo Alignment

The logo is automatically aligned in the navigation:

### Desktop View
```
┌─────────────────────────────────────────────────────┐
│ [Logo]  Home  About  Vision  Mission  ...  [Admin]  │
└─────────────────────────────────────────────────────┘
```

### Mobile View
```
┌───────────────────────────────────────────���─────────┐
│ [Logo]                                  [Admin] [☰]  │
└─────────────────────────────────────────────────────┘
```

---

## 📝 Logo URL

After uploading, the logo URL will be:
```
/uploads/[unique-filename].[extension]
```

Example:
```
/uploads/a1b2c3d4-e5f6-7890-abcd-ef1234567890.png
```

---

## ✅ Verification Checklist

After uploading your logo:

- [ ] Logo appears in preview box
- [ ] Logo URL is saved
- [ ] Logo appears in desktop navigation
- [ ] Logo appears in mobile navigation
- [ ] Logo is properly aligned
- [ ] Logo size looks good
- [ ] Logo is clickable (links to home)

---

## 🐛 Troubleshooting

### Logo not uploading?
1. Check file size (max 5MB)
2. Verify file is an image (PNG, SVG, JPG, etc.)
3. Check browser console for errors (F12)
4. Try a different image file

### Logo not appearing?
1. Hard refresh browser: `Ctrl+Shift+R`
2. Check if logo URL is saved in settings
3. Verify logo file exists in `/public/uploads/`
4. Check browser console for errors

### Logo looks distorted?
1. Use a PNG with transparent background
2. Ensure logo has proper aspect ratio
3. Try a different image size
4. Use SVG for better scalability

### Logo not aligned properly?
1. The alignment is automatic
2. Try a different logo size
3. Check if logo has transparent background
4. Refresh browser cache

---

## 🎯 Logo Best Practices

✅ **Do:**
- Use PNG with transparent background
- Keep aspect ratio consistent
- Use SVG for scalability
- Test on both desktop and mobile
- Keep file size under 1MB

❌ **Don't:**
- Use very large files (>5MB)
- Use logos with solid backgrounds
- Use extremely small images
- Use animated GIFs (not recommended)
- Use low-quality images

---

## 📱 Logo Display

### Where Logo Appears
- ✅ Desktop navigation (top left)
- ✅ Mobile navigation (top left)
- ✅ Browser tab (if favicon is set)
- ✅ All pages of website

### Logo Behavior
- Clicking logo takes you to home page
- Logo is responsive (scales on mobile)
- Logo maintains aspect ratio
- Logo has proper spacing

---

## 🔄 Updating Logo

To update your logo:

1. Go to Admin Dashboard → Settings → General
2. Click the **X** button on current logo to remove it
3. Click **"Upload Logo"** to upload new logo
4. Click **"Save Changes"**
5. Refresh website to see new logo

---

## 💾 Logo Storage

Logos are stored in:
```
/public/uploads/
```

Each uploaded file gets a unique filename:
```
[UUID].[extension]
```

Example:
```
a1b2c3d4-e5f6-7890-abcd-ef1234567890.png
```

---

## 🎨 Favicon Upload

You can also upload a favicon (website icon):

1. Go to Admin Dashboard → Settings → General
2. Scroll to **"Favicon"** section
3. Click **"Upload Favicon"**
4. Select your favicon image
5. Click **"Save Changes"**

### Favicon Specifications
- **File Type**: ICO or PNG
- **Size**: Max 1MB
- **Dimensions**: 32x32 or 64x64 pixels
- **Format**: Square image

---

## 📞 Support

If you have issues:

1. Check the troubleshooting section above
2. Verify file format and size
3. Check browser console (F12)
4. Try a different image file
5. Clear browser cache and refresh

---

## ✨ Summary

**Logo Upload Feature:**
- ✅ Upload directly from admin dashboard
- ✅ Automatic preview
- ✅ Proper alignment in navigation
- ✅ Works on desktop and mobile
- ✅ Easy to update
- ✅ Secure file storage

**To Upload:**
1. Admin Dashboard → Settings → General
2. Click "Upload Logo"
3. Select image file
4. Click "Save Changes"
5. Done! ✓

---

**Your logo is now ready to be uploaded! 🎉**

Go to Admin Dashboard → Settings → General to get started!
