# Deployment Guide

This guide walks through a fully free deployment workflow for the MySQL2 Helper Lite project. The recommended stack is:

- **Backend** – Render free tier (Node.js web service)
- **Frontend** – Vercel or GitHub Pages
- **Database** – MongoDB Atlas M0 (512 MB free cluster)

---

## 1. Prepare the Repository

```bash
git clone https://github.com/yourusername/mysql2-helper-lite-website.git
cd mysql2-helper-lite-website
```

Install backend dependencies and create an `.env` file:

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with the values from your MongoDB Atlas cluster and choose a strong `ADMIN_SECRET`.

Optional: seed the database locally.

```bash
npm run seed
```

---

## 2. MongoDB Atlas (Database)

1. Create a MongoDB Atlas account and log in.
2. Build a new **M0** (free) cluster.
3. Create a database user (e.g. `helper_admin`) with a strong password.
4. Allow your IP (or `0.0.0.0/0` for testing) in Network Access.
5. Copy the connection string. It should resemble:

```
mongodb+srv://helper_admin:<password>@cluster0.xxxxx.mongodb.net/mysql2-helper-lite
```

Update your `.env` file with this connection string.

---

## 3. Deploy the Backend on Render

1. Push the project to GitHub.
2. Sign in to [Render](https://render.com) with GitHub and click **New +** → **Web Service**.
3. Configure the service:
   - **Name:** `mysql2-helper-backend`
   - **Region:** nearest location
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Add environment variables:

```
MONGODB_URI=your-connection-string
ADMIN_SECRET=your-secret-token
PORT=3001
```

5. Deploy and wait for the build to finish.
6. Verify the deployment:

```bash
curl https://your-service.onrender.com/api/health
```

If required, seed the remote database:

```bash
curl -X POST https://your-service.onrender.com/api/seed \
  -H "Authorization: your-secret-token"
```

---

## 4. Deploy the Frontend

### Option A – Vercel

1. Install the Vercel CLI: `npm install -g vercel`.
2. Create a React application (if you do not already have one) and copy `mysql2-helper-website.jsx` to `src/App.jsx`.
3. Configure the API endpoint inside the component, e.g.:

```javascript
const API_URL = process.env.REACT_APP_API_URL ?? 'https://your-service.onrender.com/api';
```

4. Add `.env` for the frontend if you need to set `REACT_APP_API_URL`.
5. Run `vercel` from the frontend directory and follow the prompts. Store the backend URL as `REACT_APP_API_URL`.

### Option B – GitHub Pages

1. Inside the React project, set the `homepage` field in `package.json` to `https://yourusername.github.io/mysql2-helper-lite-website`.
2. Install the GitHub Pages helper: `npm install --save-dev gh-pages`.
3. Add scripts:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Run `npm run deploy`.
5. Update the API URL in the component to point to the Render backend.

---

## 5. GitHub Actions (Optional Automation)

The repository includes `.github/workflows/deploy.yml`. Update secrets in your GitHub repository:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The workflow:

1. Installs backend dependencies, runs tests (if present), and deploys to Vercel using the backend folder.
2. Creates a temporary React app, copies `mysql2-helper-website.jsx`, installs `lucide-react`, builds, and publishes to GitHub Pages.

If you maintain a dedicated frontend project, adjust the workflow accordingly.

---

## 6. Post-Deployment Checklist

- [ ] `/api/health` responds with `status: ok`
- [ ] Seeded content is available at `/api/features` and `/api/examples`
- [ ] Frontend renders data from the deployed backend
- [ ] `ADMIN_SECRET` is stored securely and not committed
- [ ] MongoDB network access is restricted to trusted IP ranges
- [ ] HTTPS is enforced on both frontend and backend

---

## 7. Troubleshooting

| Issue | Fix |
| ----- | --- |
| Backend crashes on Render | Confirm environment variables and MongoDB URI |
| `401 Unauthorized` on protected routes | Ensure the `Authorization` header matches `ADMIN_SECRET` |
| Frontend cannot reach API | Update the API URL and check browser network tab for CORS issues |
| MongoDB connection timeout | Verify IP allowlist and credentials in Atlas |
| Builds are slow | Clear build cache, ensure `node_modules` is not committed |

---

## 8. Useful Commands

```bash
# Run backend locally
cd backend && npm run dev

# Check health locally
curl http://localhost:3001/api/health

# Seed local database
cd backend && npm run seed
```

---

Deployment complete! Keep an eye on service dashboards (Render, Vercel, MongoDB Atlas) for logs, metrics, and alerts.
