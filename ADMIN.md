# Admin Dashboard Access

## Access Information

**Admin Dashboard URL:** `/admin`

**Password:** `2326`

## How to Access

1. Navigate to: `https://your-domain.com/admin` (or `http://localhost:3000/admin` for local development)
2. Enter password when prompted: `2326`
3. You'll have access to:
   - Visitor analytics and statistics
   - Real-time visitor tracking
   - Stats management (downloads, GitHub stars, active users)
   - Device, browser, and OS analytics
   - Visit duration tracking

## Backend Configuration

Make sure your `backend/.env` file has:

```
ADMIN_SECRET=2326
```

This password is used to authenticate API requests from the admin dashboard.

## Security Note

For production deployments, consider changing the admin password to a stronger value and updating both:
- Frontend password check (in `App.js`)
- Backend `ADMIN_SECRET` environment variable

