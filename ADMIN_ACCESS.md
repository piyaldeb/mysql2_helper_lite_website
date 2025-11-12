# Admin Dashboard Access Guide

## Quick Access

There are **three ways** to access the admin dashboard:

### 1. Footer Link (Recommended)
- Scroll to the bottom of the homepage
- Click the **"Admin"** link in the footer
- Enter password when prompted

### 2. Hash URL
Navigate directly to:
```
https://piyaldeb.github.io/mysql2_helper_lite_website/#admin
```

### 3. URL Path (if supported)
```
https://piyaldeb.github.io/mysql2_helper_lite_website/admin
```

## Default Password

For development and testing:
```
admin123
```

## Setting a Custom Password

### For Production
Create `frontend/.env.local` (not committed to git):

```bash
# For Create React App
REACT_APP_ADMIN_PASSWORD=your-secure-password-here
```

Or for Vite:
```bash
VITE_ADMIN_PASSWORD=your-secure-password-here
```

### For Backend API Auth
Create `backend/.env`:
```bash
ADMIN_SECRET=your-secure-password-here
```

**Important:** Use the same password in both frontend and backend env files.

## Features Available in Admin Dashboard

Once logged in, you have access to:
- 📊 Visitor analytics and real-time tracking
- 📈 Stats management (downloads, GitHub stars, active users)
- 💻 Device, browser, and OS analytics
- ⏱️ Visit duration tracking
- 🔄 Real-time data refresh

## Security Notes

⚠️ **For Production:**
1. Never use the default `admin123` password
2. Set a strong password via environment variables
3. Never commit `.env` or `.env.local` files
4. Keep credentials private and secure
5. Consider adding IP restrictions for additional security

## Troubleshooting

**Can't access admin?**
- Make sure you're using the correct password
- Try the hash URL: `/#admin`
- Check browser console for errors
- Clear browser cache and try again

**Password not working?**
- Default is `admin123` for development
- Check if custom password is set in `.env.local`
- Ensure no trailing spaces in password
