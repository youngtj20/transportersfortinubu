# Menu Items Reference Card

## 📋 Quick Reference - Copy & Paste Values

### Menu Item 1: Home
```
Label:     Home
URL:       /
Icon:      home
Order:     0
Target:    _self
Published: ✓
```

### Menu Item 2: About Us
```
Label:     About Us
URL:       /about
Icon:      users
Order:     1
Target:    _self
Published: ✓
```

### Menu Item 3: Vision
```
Label:     Vision
URL:       /vision
Icon:      target
Order:     2
Target:    _self
Published: ✓
```

### Menu Item 4: Mission
```
Label:     Mission
URL:       /mission
Icon:      flag
Order:     3
Target:    _self
Published: ✓
```

### Menu Item 5: Structure
```
Label:     Structure
URL:       /structure
Icon:      building
Order:     4
Target:    _self
Published: ✓
```

### Menu Item 6: Timeline
```
Label:     Timeline
URL:       /timeline
Icon:      calendar
Order:     5
Target:    _self
Published: ✓
```

### Menu Item 7: Contact
```
Label:     Contact
URL:       /contact
Icon:      phone
Order:     6
Target:    _self
Published: ✓
```

### Menu Item 8: Email
```
Label:     Email
URL:       mailto:info@transportersfortinubu.ng
Icon:      mail
Order:     7
Target:    _blank
Published: ✓
```

---

## 🎨 Icon Visual Reference

```
home     → 🏠 (House icon)
users    → 👥 (People icon)
target   → 🎯 (Target/Bullseye icon)
flag     → 🚩 (Flag icon)
building → 🏢 (Building icon)
calendar → 📅 (Calendar icon)
phone    → ☎️ (Phone icon)
mail     → ✉️ (Mail/Envelope icon)
email    → ✉️ (Mail/Envelope icon - same as mail)
```

---

## 📊 Complete Menu Structure Table

| # | Label | URL | Icon | Order | Target |
|---|-------|-----|------|-------|--------|
| 1 | Home | / | home | 0 | _self |
| 2 | About Us | /about | users | 1 | _self |
| 3 | Vision | /vision | target | 2 | _self |
| 4 | Mission | /mission | flag | 3 | _self |
| 5 | Structure | /structure | building | 4 | _self |
| 6 | Timeline | /timeline | calendar | 5 | _self |
| 7 | Contact | /contact | phone | 6 | _self |
| 8 | Email | mailto:info@transportersfortinubu.ng | mail | 7 | _blank |

---

## 🔗 URL Mapping

```
Home       → /
About Us   → /about
Vision     → /vision
Mission    → /mission
Structure  → /structure
Timeline   → /timeline
Contact    → /contact
Email      → mailto:info@transportersfortinubu.ng
```

---

## 🎯 Step-by-Step Process

### For Each Menu Item:

1. **Go to Admin Dashboard**
   - URL: `http://localhost:3000/admin/dashboard`

2. **Click Menu Management**

3. **Click "Add Menu Item"**

4. **Copy values from above** (Label, URL, Icon, Order)

5. **Fill in the form:**
   - Label: [Copy from above]
   - URL: [Copy from above]
   - Icon: [Copy from above]
   - Order: [Copy from above]
   - Target: [Copy from above]
   - Published: ✓ (Always check this)

6. **Click "Create"**

7. **Repeat for next item**

---

## ✅ Verification After Setup

### Check Desktop Menu
- [ ] Home (🏠)
- [ ] About Us (👥)
- [ ] Vision (🎯)
- [ ] Mission (🚩)
- [ ] Structure (🏢)
- [ ] Timeline (📅)
- [ ] Contact (☎️)
- [ ] Email (✉️)

### Check Mobile Menu
- [ ] All items appear in hamburger menu
- [ ] Icons display correctly
- [ ] Items are in correct order

### Check Links
- [ ] Home → / (works)
- [ ] About Us → /about (works)
- [ ] Vision → /vision (works)
- [ ] Mission → /mission (works)
- [ ] Structure → /structure (works)
- [ ] Timeline → /timeline (works)
- [ ] Contact → /contact (works)
- [ ] Email → opens email client (works)

---

## 🎨 Visual Preview

### How It Will Look

**Desktop:**
```
┌─────────��───────────────────────────────────────────────────┐
│ Logo  🏠 Home  👥 About Us  🎯 Vision  🚩 Mission           │
│       🏢 Structure  📅 Timeline  ☎️ Contact  ✉️ Email        │
│                                              [Admin Login]   │
└─────────────────────────────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────────────────────────────────────────────┐
│ Logo                                    [Admin] [☰ Menu]    │
│                                                              │
│ When menu clicked:                                           │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🏠 Home                                          →   │   │
│ │ 👥 About Us                                    →   │   │
│ │ 🎯 Vision                                      →   │   │
│ │ 🚩 Mission                                     →   │   │
│ │ 🏢 Structure                                   →   │   │
│ │ 📅 Timeline                                    →   │   │
│ │ ☎️ Contact                                     →   │   │
│ │ ✉️ Email                                       →   │   │
│ │ [Admin Login]                                      │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 💾 Database Insert (Alternative Method)

If you have direct database access, run this SQL:

```sql
INSERT INTO menu_items (id, label, url, icon, `order`, parentId, published, target, createdAt, updatedAt) VALUES
('menu-home', 'Home', '/', 'home', 0, NULL, true, '_self', NOW(), NOW()),
('menu-about', 'About Us', '/about', 'users', 1, NULL, true, '_self', NOW(), NOW()),
('menu-vision', 'Vision', '/vision', 'target', 2, NULL, true, '_self', NOW(), NOW()),
('menu-mission', 'Mission', '/mission', 'flag', 3, NULL, true, '_self', NOW(), NOW()),
('menu-structure', 'Structure', '/structure', 'building', 4, NULL, true, '_self', NOW(), NOW()),
('menu-timeline', 'Timeline', '/timeline', 'calendar', 5, NULL, true, '_self', NOW(), NOW()),
('menu-contact', 'Contact', '/contact', 'phone', 6, NULL, true, '_self', NOW(), NOW()),
('menu-email', 'Email', 'mailto:info@transportersfortinubu.ng', 'mail', 7, NULL, true, '_blank', NOW(), NOW());
```

---

## 🚀 Quick Start

**Fastest way to set up all menu items:**

1. Open Admin Dashboard: `http://localhost:3000/admin/dashboard`
2. Go to Menu Management
3. For each item in the table above:
   - Click "Add Menu Item"
   - Copy Label, URL, Icon, Order from table
   - Set Target and Published as shown
   - Click "Create"
4. Refresh website
5. All menu items should appear! ✓

---

## 📞 Troubleshooting

**Menu item not showing?**
- Check if "Published" is ✓ (checked)
- Hard refresh: `Ctrl+Shift+R`
- Check Admin Dashboard → Menu Management

**Icon not displaying?**
- Verify icon name is correct (lowercase)
- Check supported icons list above
- Try a different icon

**Link not working?**
- Verify URL is correct
- For internal links: use "/" prefix (e.g., "/about")
- For external links: use full URL
- Check Target setting (_self vs _blank)

---

**Status**: Ready to implement! 🎉

Follow the steps above to add all menu items with proper icons and links.
