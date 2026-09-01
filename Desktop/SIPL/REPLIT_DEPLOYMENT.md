# Replit Deployment Guide for MindScreen

## Quick Setup (5 minutes)

### Step 1: Go to Replit
1. Visit https://replit.com
2. Sign up with GitHub
3. Click **"Create"** → **"Import from GitHub"**
4. Search and select: `shreyaamarwaha/SIPL-webapp`
5. Click **"Import"**

### Step 2: Run Backend
1. Replit will detect `.replit` and auto-install dependencies
2. Click **"Run"** button
3. Backend starts on `https://your-replit-url.replit.dev`
4. You'll see logs: `INFO:     Uvicorn running on http://0.0.0.0:8000`

### Step 3: Get Your Backend URL
1. In Replit, look for the **Webview** panel (right side)
2. It shows your public URL: `https://your-replit-url.replit.dev`
3. Copy this URL

### Step 4: Deploy Frontend to Vercel
1. Go to https://vercel.com/new
2. Import the same repository
3. Set Root Directory: `Desktop/SIPL/frontend`
4. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-replit-url.replit.dev` (from Step 3)
5. Deploy!

### Step 5: Access Your App
- **Frontend**: `https://mindscreen-web.vercel.app`
- **Backend API**: `https://your-replit-url.replit.dev`
- **Backend Docs**: `https://your-replit-url.replit.dev/docs`

---

## Architecture

```
┌─────────────────────────────────────┐
│   Vercel Frontend                   │
│   (React + Vite)                    │
│   https://mindscreen-web.vercel.app │
└────────────┬────────────────────────┘
             │ HTTP Requests
             ↓
┌─────────────────────────────────────┐
│   Replit Backend                    │
│   (FastAPI + Python)                │
│   https://your-replit.replit.dev    │
└─────────────────────────────────────┘
```

---

## Features

✅ **Completely Free**
- Replit free tier: unlimited projects
- Vercel free tier: unlimited deployments
- No credit card required

✅ **Auto-Deploy**
- Push to GitHub → Both services auto-redeploy
- Vercel watches deployable branch
- Replit watches your repo

✅ **Easy Updates**
- Edit code locally
- Push to GitHub
- Services auto-update

---

## Troubleshooting

### Backend won't start
1. Check the Replit console for errors
2. Verify `requirements.txt` has all dependencies
3. Check Python version: should be 3.10+

### Frontend can't reach backend
1. Check Vercel environment variables
2. Verify `VITE_API_URL` matches your Replit URL exactly
3. Try accessing backend URL directly in browser

### Replit keeps crashing
1. Click **"Stop"** then **"Run"** again
2. Check memory usage (right panel shows stats)
3. If out of memory, consider upgrading Replit plan

---

## Upgrading (Optional)

- **Replit Paid**: $7/month for faster hardware, persistent storage
- **Vercel Pro**: $20/month for more analytics and features
- Both are optional - free tier works great for testing

---

## Next Steps

1. ✅ Create Replit project (import from GitHub)
2. ✅ Run backend, get URL
3. ✅ Deploy frontend to Vercel
4. ✅ Add VITE_API_URL to Vercel environment
5. ✅ Test the full app!

That's it! 🚀
