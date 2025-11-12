# Admin Dashboard Access

## Access Information

**Admin Dashboard URL:** `/admin`

**Password:** Set via environment variable (see configuration below)

## Configuration

### Backend Configuration

Create `backend/.env` file (DO NOT commit this file):

```bash
# Copy and edit with your values
ADMIN_SECRET=your-secure-admin-secret-here
MONGODB_URI=your-mongodb-connection-string
PORT=3001
```

### Frontend Configuration

Create `frontend/.env.local` file (DO NOT commit this file):

```bash
# For Create React App
REACT_APP_ADMIN_PASSWORD=your-secure-admin-password-here
```

For Vite projects, create `frontend/.env.local`:

```bash
VITE_ADMIN_PASSWORD=your-secure-admin-password-here
```

**Note:** The password should be the same value in both `ADMIN_SECRET` (backend) and `REACT_APP_ADMIN_PASSWORD`/`VITE_ADMIN_PASSWORD` (frontend) for proper authentication.

## How to Access

1. Navigate to: `https://your-domain.com/admin` (or `http://localhost:3000/admin` for local development)
2. Enter the password set in your environment variables
3. You'll have access to:
   - Visitor analytics and statistics
   - Real-time visitor tracking
   - Stats management (downloads, GitHub stars, active users)
   - Device, browser, and OS analytics
   - Visit duration tracking

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` or `.env.local` files to version control
- Use strong, unique passwords for production
- Keep admin credentials secure and private
- The password should match between frontend (`REACT_APP_ADMIN_PASSWORD`) and backend (`ADMIN_SECRET`) for API authentication

