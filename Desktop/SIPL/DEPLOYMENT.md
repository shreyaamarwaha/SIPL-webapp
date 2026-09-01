# 🚀 MindScreen Deployment Guide

This guide covers deploying MindScreen to **Vercel (Frontend)** and **Railway (Backend)** — both with free tiers.

---

## Prerequisites

- GitHub account (repository already set up)
- Vercel account (sign up at https://vercel.com)
- Railway account (sign up at https://railway.app)

---

## Part 1: Deploy Backend to Railway

### Step 1: Connect GitHub to Railway
1. Go to https://railway.app
2. Click **"Start New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub repositories
5. Select: **shreyaamarwaha/SIPL-webapp**
6. Select branch: **deployable**

### Step 2: Configure Railway Service
1. Railway should auto-detect the Dockerfile
2. It will create a service named after your repo
3. Go to **Variables** tab and set:
   - `PYTHON_VERSION` = `3.12`
   - `CORS_ORIGINS` = `*` (or your Vercel frontend URL)

### Step 3: Deploy
1. Click **Deploy**
2. Wait for build to complete (takes 3-5 minutes)
3. Once deployed, you'll get a URL like: `https://mindscreen-backend-production-xxxx.up.railway.app`
4. Copy this URL — you'll need it for the frontend

### Step 4: Verify Backend
- Open the Railway URL in your browser
- You should see a 404 error (that's OK — the root path doesn't exist)
- Try `/docs` to see the API documentation
- Example: `https://mindscreen-backend-production-xxxx.up.railway.app/docs`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Connect GitHub to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find and select: **shreyaamarwaha/SIPL-webapp**
4. Click **"Import"**

### Step 2: Configure Project
1. **Framework Preset**: Choose **"Vite"**
2. **Root Directory**: Select `Desktop/SIPL/frontend`
3. **Build Command**: `npm run build` (should auto-populate)
4. **Output Directory**: `dist` (should auto-populate)

### Step 3: Set Environment Variables
1. In the **Environment Variables** section, add:
   - **Name**: `VITE_API_URL`
   - **Value**: (paste your Railway backend URL from Step 1)
   - Example: `https://mindscreen-backend-production-xxxx.up.railway.app`

2. Click **"Add"**

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (takes 2-3 minutes)
3. You'll get a Vercel URL like: `https://mindscreen-web.vercel.app`
4. Click to visit and test!

---

## Part 3: Update Backend CORS (if needed)

If you get CORS errors:

1. Go to your Railway project dashboard
2. Click **"Variables"**
3. Update `CORS_ORIGINS` to your Vercel URL:
   - From: `*`
   - To: `https://mindscreen-web.vercel.app`
4. Railway will auto-redeploy

---

## Troubleshooting

### Frontend shows 404 or blank page
- Check Vercel deployment logs
- Verify `VITE_API_URL` environment variable is set correctly
- Try accessing the backend URL directly in browser

### Frontend can't reach backend (CORS error)
- Open browser DevTools Console (F12)
- Check network tab for failed requests
- Verify backend URL is correct (should start with `https://`)
- Check Railway `CORS_ORIGINS` variable includes Vercel URL

### Backend deployment fails on Railway
- Check Railway deployment logs
- Verify `requirements-prod.txt` is in the backend directory
- Verify Python version is set to 3.12
- Try redeploying from Railway dashboard

### Local development still works?
- Yes! Run `npm run dev` in frontend and `uvicorn ml.api.main:app --reload` in backend
- They'll communicate via localhost:8000

---

## Useful URLs After Deployment

- **Frontend**: `https://mindscreen-web.vercel.app` (your Vercel URL)
- **Backend API**: `https://mindscreen-backend-production-xxxx.up.railway.app`
- **Backend Docs**: `https://mindscreen-backend-production-xxxx.up.railway.app/docs`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/project

---

## What Gets Deployed

### Backend (Railway)
- FastAPI application with ML screening engines
- SQLite database for session persistence
- Python 3.12 runtime
- Auto-redeploys on `deployable` branch pushes

### Frontend (Vercel)
- React + Vite single-page application
- Tailwind CSS styling
- Auto-redirects to `/index.html` for routing
- Auto-redeploys on `deployable` branch pushes

---

## Next Steps

After deployment is live:
1. Test the full assessment flow end-to-end
2. Monitor Railway logs for any backend errors
3. Monitor Vercel logs for any frontend errors
4. Update CORS settings if needed
5. Consider upgrading to paid tiers if you need:
   - PostgreSQL database (Railway)
   - Custom domain (Vercel)
   - Faster builds
   - Higher usage limits

---

## Local Development

To run locally during development:

### Terminal 1 (Backend):
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn ml.api.main:app --reload --port 8000
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm run dev
```

Frontend will be at: `http://localhost:5173`
Backend will be at: `http://localhost:8000`

---

## Questions?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com
- Vite Docs: https://vitejs.dev
