# Logo Upload - Troubleshooting Guide

## 🔧 Error: 401 Unauthorized

### What This Means
The upload API is not recognizing your authentication session.

### Solutions

#### Solution 1: Log Out and Log Back In
1. Go to Admin Dashboard
2. Click **Logout** button
3. Log back in with your admin credentials
4. Try uploading logo again

#### Solution 2: Clear Browser Cache
1. Press **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
2. Select **Cookies and other site data**
3. Click **Clear data**
4. Go back to Admin Dashboard
5. Try uploading again

#### Solution 3: Use Incognito/Private Window
1. Open a new **Incognito** (Chrome) or **Private** (Firefox) window
2. Go to Admin Dashboard: `http://localhost:3000/admin/dashboard`
3. Log in with your credentials
4. Try uploading logo

#### Solution 4: Check Session
1. Open browser console (F12)
2. Go to **Application** tab
3. Check **Cookies** for `next-auth.session-token`
4. If missing, log out and log back in

---

## 🔍 Other Common Errors

### Error: "Upload failed: Invalid file type"

**Cause**: File is not an image

**Solution**:
- Use PNG, SVG, JPG, GIF, or WebP format
- Don't use other file types (PDF, Word, etc.)

### Error: "Upload failed: File too large"

**Cause**: File exceeds 5MB limit

**Solution**:
- Compress your image
- Use online image compressor
- Reduce image dimensions
- Use PNG instead of other formats

### Error: "Upload failed: No file provided"

**Cause**: File wasn't selected properly

**Solution**:
- Click "Upload Logo" button again
- Select a file from your computer
- Make sure file is selected before uploading

### Error: "Upload error: Unknown error"

**Cause**: Server-side error

**Solution**:
1. Check browser console (F12) for details
2. Try a different image file
3. Restart the development server
4. Check if `/public/uploads/` directory exists

---

## ✅ Step-by-Step Fix

### If You're Getting 401 Error:

**Step 1: Verify You're Logged In**
- Check if you see your username in top right
- If not, log in again

**Step 2: Clear Session**
- Log out completely
- Close browser tab
- Open new tab
- Go to Admin Dashboard
- Log in again

**Step 3: Try Upload**
- Go to Settings → General
- Click "Upload Logo"
- Select image
- Try uploading

**Step 4: Check Console**
- Press F12 to open console
- Look for error messages
- Note any error details

**Step 5: Restart Server**
- Stop development server (Ctrl+C)
- Run `npm run dev` again
- Try uploading

---

## 🔐 Authentication Checklist

- [ ] You are logged in to admin dashboard
- [ ] You see your username in top right
- [ ] You can access other admin pages
- [ ] Browser cookies are enabled
- [ ] You're not in private/incognito mode
- [ ] Session hasn't expired

---

## 📝 Debug Information

### To Get More Details:

1. **Open Browser Console** (F12)
2. **Go to Network Tab**
3. **Try uploading logo**
4. **Look for `/api/upload` request**
5. **Check response status and body**

### What to Look For:
- Status: Should be 201 (success) or 401 (auth error)
- Response: Should show error message
- Headers: Check if cookies are sent

---

## 🚀 Quick Fixes (Try These First)

1. **Log out and log back in** ← Try this first!
2. **Hard refresh browser** (Ctrl+Shift+R)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Use different image file**
5. **Restart development server**
6. **Use incognito/private window**

---

## 📞 If Problem Persists

### Check These:

1. **Is development server running?**
   - Should see "Ready on http://localhost:3000"

2. **Is `/public/uploads/` directory writable?**
   - Check file permissions

3. **Is database connected?**
   - Try accessing other admin pages

4. **Are you using correct admin account?**
   - Try with different admin user

5. **Is there a firewall blocking uploads?**
   - Check network settings

---

## 🎯 Prevention Tips

- **Don't close browser tab** during upload
- **Don't navigate away** while uploading
- **Keep session active** by using dashboard regularly
- **Use same browser** for consistency
- **Keep browser updated** for better compatibility

---

## 📋 Checklist Before Uploading

- [ ] Logged in to admin dashboard
- [ ] Image file is PNG or SVG
- [ ] File size is less than 5MB
- [ ] Image has transparent background
- [ ] Browser console shows no errors
- [ ] Development server is running
- [ ] Internet connection is stable

---

## ✨ Success Indicators

After successful upload, you should see:
- ✅ Logo preview appears
- ✅ Success message shows
- ✅ Logo URL is saved
- ✅ No error messages
- ✅ Logo appears in navigation after refresh

---

## 🔄 If Still Not Working

1. **Restart everything:**
   - Stop dev server (Ctrl+C)
   - Close browser
   - Run `npm run dev`
   - Open browser fresh

2. **Check logs:**
   - Look at terminal output
   - Check for error messages
   - Note any warnings

3. **Try minimal test:**
   - Use smallest image possible
   - Try PNG format
   - Try different image

4. **Contact support:**
   - Provide error message
   - Provide browser console output
   - Provide terminal output

---

## 📚 Related Documentation

- **LOGO_UPLOAD_QUICK_START.md** - Quick start guide
- **LOGO_UPLOAD_GUIDE.md** - Detailed guide
- **LOGO_UPLOAD_COMPLETE.md** - Complete implementation

---

**Most 401 errors are fixed by logging out and logging back in! Try that first. 🚀**
