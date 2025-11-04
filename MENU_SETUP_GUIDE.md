# Complete Menu Setup Guide

## 📋 Menu Items to Create

Here's the complete list of menu items with icons and links to create in your admin dashboard:

### Menu Structure

| Order | Label | URL | Icon | Target | Published |
|-------|-------|-----|------|--------|-----------|
| 0 | Home | / | home | _self | ✓ |
| 1 | About Us | /about | users | _self | ✓ |
| 2 | Vision | /vision | target | _self | ✓ |
| 3 | Mission | /mission | flag | _self | ✓ |
| 4 | Structure | /structure | building | _self | ✓ |
| 5 | Timeline | /timeline | calendar | _self | ✓ |
| 6 | Contact | /contact | phone | _self | ✓ |
| 7 | Email | mailto:info@transportersfortinubu2027.org | mail | _blank | ✓ |

---

## 🚀 How to Add All Menu Items

### Option 1: Add Manually (One by One)

1. Go to **Admin Dashboard** → `http://localhost:3000/admin/dashboard`
2. Click **Menu Management**
3. For each item in the table above:
   - Click **"Add Menu Item"**
   - Fill in the fields from the table
   - Click **"Create"**

### Option 2: Use Database Script (Faster)

If you have database access, you can run this SQL to insert all items at once:

```sql
INSERT INTO menu_items (id, label, url, icon, `order`, parentId, published, target, createdAt, updatedAt) VALUES
('menu-1', 'Home', '/', 'home', 0, NULL, true, '_self', NOW(), NOW()),
('menu-2', 'About Us', '/about', 'users', 1, NULL, true, '_self', NOW(), NOW()),
('menu-3', 'Vision', '/vision', 'target', 2, NULL, true, '_self', NOW(), NOW()),
('menu-4', 'Mission', '/mission', 'flag', 3, NULL, true, '_self', NOW(), NOW()),
('menu-5', 'Structure', '/structure', 'building', 4, NULL, true, '_self', NOW(), NOW()),
('menu-6', 'Timeline', '/timeline', 'calendar', 5, NULL, true, '_self', NOW(), NOW()),
('menu-7', 'Contact', '/contact', 'phone', 6, NULL, true, '_self', NOW(), NOW()),
('menu-8', 'Email', 'mailto:info@transportersfortinubu2027.org', 'mail', 7, NULL, true, '_blank', NOW(), NOW());
```

---

## 📝 Step-by-Step Instructions

### Step 1: Home Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Home
   - **URL**: /
   - **Icon**: home
   - **Order**: 0
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 2: About Us Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: About Us
   - **URL**: /about
   - **Icon**: users
   - **Order**: 1
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 3: Vision Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Vision
   - **URL**: /vision
   - **Icon**: target
   - **Order**: 2
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 4: Mission Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Mission
   - **URL**: /mission
   - **Icon**: flag
   - **Order**: 3
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 5: Structure Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Structure
   - **URL**: /structure
   - **Icon**: building
   - **Order**: 4
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 6: Timeline Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Timeline
   - **URL**: /timeline
   - **Icon**: calendar
   - **Order**: 5
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 7: Contact Menu Item
1. Click **"Add Menu Item"**
2. Fill in:
   - **Label**: Contact
   - **URL**: /contact
   - **Icon**: phone
   - **Order**: 6
   - **Target**: _self
   - **Published**: ✓ (checked)
3. Click **"Create"**

### Step 8: Email Menu Item (Already Created)
- This should already exist from your previous setup
- If not, create it with:
  - **Label**: Email
  - **URL**: mailto:info@transportersfortinubu2027.org
  - **Icon**: mail
  - **Order**: 7
  - **Target**: _blank
  - **Published**: ✓ (checked)

---

## 🎨 Icon Reference

Here are all available icons you can use:

| Icon Name | Display | Use Case |
|-----------|---------|----------|
| **home** | 🏠 | Home page |
| **users** | 👥 | About Us, Team |
| **target** | 🎯 | Vision, Goals |
| **flag** | 🚩 | Mission, Objectives |
| **building** | 🏢 | Structure, Organization |
| **calendar** | 📅 | Timeline, Events, Schedule |
| **phone** | ☎️ | Contact, Support |
| **mail** | ✉️ | Email, Newsletter |
| **email** | ✉️ | Email (alias for mail) |

---

## ✅ Verification Checklist

After adding all menu items, verify:

- [ ] Home appears in menu (order 0)
- [ ] About Us appears in menu (order 1)
- [ ] Vision appears in menu (order 2)
- [ ] Mission appears in menu (order 3)
- [ ] Structure appears in menu (order 4)
- [ ] Timeline appears in menu (order 5)
- [ ] Contact appears in menu (order 6)
- [ ] Email appears in menu (order 7)
- [ ] All icons display correctly
- [ ] All links work when clicked
- [ ] Menu appears in desktop navigation
- [ ] Menu appears in mobile navigation
- [ ] Menu items are in correct order

---

## 🔍 How to Check Menu Items

### In Admin Dashboard:
1. Go to **Admin Dashboard** → `http://localhost:3000/admin/dashboard`
2. Click **Menu Management**
3. You should see all 8 menu items listed

### On Website:
1. Go to **Home** → `http://localhost:3000`
2. Check **Desktop Menu** (top navigation bar)
3. Check **Mobile Menu** (hamburger icon on mobile)
4. All items should appear in order

---

## 🔧 Editing Menu Items

If you need to edit a menu item:

1. Go to **Menu Management**
2. Find the item you want to edit
3. Click the **Edit** button (pencil icon)
4. Modify the fields
5. Click **"Update"**

---

## 🗑️ Deleting Menu Items

If you need to delete a menu item:

1. Go to **Menu Management**
2. Find the item you want to delete
3. Click the **Delete** button (trash icon)
4. Confirm deletion

---

## 📱 Menu Display

### Desktop View (lg+)
```
Logo    Home  About Us  Vision  Mission  Structure  Timeline  Contact  Email  [Admin Login]
```

### Mobile View (< lg)
```
Logo                                                    [Admin] [☰ Menu]

When menu clicked:
┌─────────────────────────────┐
│ 🏠 Home                  →  │
│ 👥 About Us              →  │
│ 🎯 Vision                →  │
│ 🚩 Mission               →  │
│ 🏢 Structure             →  │
│ 📅 Timeline              →  │
│ ☎️ Contact               →  │
│ ✉️ Email                 →  │
│ [Admin Login]               │
└─────────────────────────────┘
```

---

## 💡 Tips

- **Order matters**: Lower numbers appear first (0, 1, 2...)
- **Icons are optional**: If you don't specify an icon, a default chevron will appear
- **External links**: Use full URL and set Target to "_blank"
- **Internal links**: Use path format "/page-name"
- **Publishing**: Always check "Published" to make items visible
- **Target="_blank"**: Opens link in new window (good for external links)
- **Target="_self"**: Opens link in same window (good for internal links)

---

## 🚀 Quick Copy-Paste Template

Use this template for each menu item:

```
Label:     [From table]
URL:       [From table]
Icon:      [From table]
Order:     [From table]
Target:    [From table]
Published: ✓ (always checked)
```

---

## 📞 Support

If you have any issues:

1. Check the **Menu Management** page to see all items
2. Verify each item has:
   - Label (required)
   - URL (required)
   - Published toggle ON
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Check browser console for errors (F12)

---

## ✨ Result

After completing all steps, your website will have:
- ✅ Complete navigation menu with 8 items
- ✅ All pages linked in menu
- ✅ Professional icons for each menu item
- ✅ Proper ordering and organization
- ✅ Working links to all pages
- ✅ Email link for contact

**Your menu system will be fully set up and ready to use!** 🎉
