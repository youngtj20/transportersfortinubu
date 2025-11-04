# Dynamic Settings - Complete Guide

## ✅ What's Now Dynamic

Your website now reads the following from the admin dashboard:

### 1. **Logo** ✅
- Upload from Admin Dashboard
- Displays in navigation
- Replaces default "T" icon

### 2. **Site Title** ✅
- Set from Admin Dashboard
- Displays when no logo is active
- Example: "Transporters for Tinubu"

### 3. **Site Subtitle** ✅
- Set from Admin Dashboard
- Displays below site title
- Example: "2027"

### 4. **Social Media Links** ✅
- Facebook URL
- Twitter URL
- Instagram URL
- LinkedIn URL

---

## 🎯 How to Configure

### Step 1: Go to Admin Dashboard
```
http://localhost:3000/admin/dashboard
```

### Step 2: Click Settings
- Click **Settings** in sidebar
- Click **General** tab

### Step 3: Configure Site Title
1. Find **Site Title** field
2. Enter your site title
3. Example: "Transporters for Tinubu 2027"

### Step 4: Configure Social Media
1. Click **Social** tab
2. Enter your social media URLs:
   - **Facebook**: https://facebook.com/yourpage
   - **Twitter**: https://twitter.com/yourhandle
   - **Instagram**: https://instagram.com/yourprofile
   - **LinkedIn**: https://linkedin.com/company/yourcompany

### Step 5: Save Changes
1. Click **"Save Changes"** button
2. Settings are now saved

### Step 6: Verify
1. Go to website homepage
2. Site title should display (if no logo)
3. Social links are now available

---

## 📋 Settings Available

### General Tab
- ✅ Site Title
- ✅ Site Description
- ✅ Site URL
- ✅ Logo Upload
- ✅ Favicon Upload

### Contact Tab
- ✅ Contact Email
- ✅ Contact Phone

### Social Tab
- ✅ Facebook URL
- ✅ Twitter URL
- ✅ Instagram URL
- ✅ LinkedIn URL

### Advanced Tab
- ✅ Maintenance Mode
- ✅ Allow Registration
- ✅ Email Notifications

---

## 🔄 How It Works

### Site Title Display
```
If Logo is Active:
  → Only logo displays
  → Site title is hidden

If No Logo:
  → Site title displays
  → Subtitle displays below
```

### Social Media Links
```
Stored in Database:
  → socialFacebook
  → socialTwitter
  → socialInstagram
  → socialLinkedIn

Fetched by Navigation:
  → Available for use in components
  → Can be displayed in footer
  �� Can be used in social sharing
```

---

## 📝 Example Configuration

### Site Title
```
Field: Site Title
Value: Transporters for Tinubu 2027
```

### Social Media
```
Facebook:  https://facebook.com/transportersfortinubu
Twitter:   https://twitter.com/transporters2027
Instagram: https://instagram.com/transportersfortinubu
LinkedIn:  https://linkedin.com/company/transporters-for-tinubu
```

---

## 🚀 Try Now

1. **Go to Admin Dashboard**: `http://localhost:3000/admin/dashboard`
2. **Click Settings → General**
3. **Update Site Title** to your desired title
4. **Click Settings → Social**
5. **Add your social media URLs**
6. **Click "Save Changes"**
7. **Refresh website** to see changes

---

## ✨ Features

### Dynamic Content
- ✅ Site title reads from admin
- ✅ Social links read from admin
- ✅ Logo reads from admin
- ✅ All changes reflect immediately

### Flexibility
- ✅ Change site title anytime
- ✅ Update social links anytime
- ✅ Upload/remove logo anytime
- ✅ No code changes needed

### Persistence
- ✅ Settings saved to database
- ✅ Persist across page refreshes
- ✅ Available on all pages
- ✅ Consistent across website

---

## 🔧 Technical Details

### Navigation Component
```
Fetches from /api/settings:
  → logoUrl
  → siteTitle
  → siteSubtitle
  → socialFacebook
  → socialTwitter
  → socialInstagram
  → socialLinkedIn
```

### Settings API
```
GET /api/settings
  → Returns all settings from database

POST /api/settings
  → Saves settings to database
```

### Database Storage
```
Table: settings
Columns:
  - key (setting name)
  - value (setting value)
  - type (text/boolean)
```

---

## 📊 Settings Keys

| Key | Type | Example |
|-----|------|---------|
| siteTitle | text | Transporters for Tinubu |
| siteDescription | text | Supporting the vision... |
| siteUrl | text | https://example.com |
| logoUrl | text | /uploads/logo.png |
| faviconUrl | text | /uploads/favicon.ico |
| contactEmail | text | info@example.com |
| contactPhone | text | +234 800 000 0000 |
| socialFacebook | text | https://facebook.com/... |
| socialTwitter | text | https://twitter.com/... |
| socialInstagram | text | https://instagram.com/... |
| socialLinkedIn | text | https://linkedin.com/... |

---

## 🎯 Use Cases

### Change Site Title
1. Go to Admin Dashboard
2. Settings → General
3. Update "Site Title"
4. Click "Save Changes"
5. Title updates on website

### Add Social Media Links
1. Go to Admin Dashboard
2. Settings → Social
3. Enter Facebook URL
4. Enter Twitter URL
5. Enter Instagram URL
6. Enter LinkedIn URL
7. Click "Save Changes"
8. Links are now available

### Update Logo
1. Go to Admin Dashboard
2. Settings → General
3. Click "Upload Logo"
4. Select new logo
5. Click "Save Changes"
6. Logo updates on website

---

## ✅ Verification Checklist

After configuring settings:

- [ ] Site title is set in admin
- [ ] Social media URLs are set
- [ ] Logo is uploaded
- [ ] Settings are saved
- [ ] Website displays site title (if no logo)
- [ ] Website displays logo (if uploaded)
- [ ] Social links are available
- [ ] Changes persist after refresh

---

## 🔄 Update Frequency

Settings are fetched:
- ✅ When page loads
- ✅ When component mounts
- ✅ Automatically on navigation

Changes appear:
- ✅ After page refresh
- ✅ After navigation
- ✅ Immediately in admin

---

## 📞 Support

### To Change Site Title
1. Admin Dashboard → Settings → General
2. Update "Site Title" field
3. Click "Save Changes"

### To Add Social Links
1. Admin Dashboard → Settings → Social
2. Enter social media URLs
3. Click "Save Changes"

### To Upload Logo
1. Admin Dashboard → Settings → General
2. Click "Upload Logo"
3. Select image
4. Click "Save Changes"

---

## 🎉 Summary

Your website now has **fully dynamic settings**:

✅ Site title from admin  
��� Social media links from admin  
✅ Logo from admin  
✅ All changes persist  
✅ No code changes needed  

**Everything is now configurable from the admin dashboard! 🚀**
