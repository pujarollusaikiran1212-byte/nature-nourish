# Railway Deployment Guide

## Problem
The URL `nature-nourish-production.up.railway.app` shows `DNS_PROBE_FINISHED_NXDOMAIN` - this means Railway cannot find your project.

## Root Cause
This error occurs when:
1. The Railway project was deleted or paused
2. The deployment never completed successfully  
3. The service name changed on Railway

## Solution - Redeploy Your Project

### Step 1: Check Railway Dashboard
1. Go to https://railway.app/dashboard
2. Check if project "nature-nourish" exists and is NOT paused
3. If it exists, get the new URL from Deployments tab

### Step 2: Redeploy Using Railway CLI

Run these commands in your terminal:

```
bash
# 1. Install Railway CLI (if not installed)
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Navigate to project
cd "C:\Users\ASUS\New folder\my website"

# 4. Initialize/Link Railway project
railway init
railway link

# 5. Deploy
railway up

# 6. Check status
railway status

# 7. View logs
railway logs

# 8. Get new domain
railway domain
```

### Step 3: Alternative - Deploy via GitHub
1. Push code to GitHub
2. Go to Railway Dashboard → New Project
3. Select "Deploy from GitHub repo"
4. Select your repository

## Configuration Files (Already Created)
- ✅ `railway.toml` - Railway deployment config
- ✅ `server.js` - Listens on `process.env.PORT` (correct for Railway)

## After Getting New URL
Update `backend/script.js` with your new Railway URL:
```
javascript
const API_BASE_URL = 'https://YOUR-NEW-URL.up.railway.app';
```

## Files in Project
```
my website/
├── backend/
│   ├── server.js          # Express server
│   ├── index.html         # Main website
│   ├── admin.html         # Admin portal
│   ├── script.js          # Frontend JS
│   ├── style.css          # Styles
│   ├── package.json       # Dependencies
│   └── src/
│       ├── config/db.js   # MongoDB connection
│       ├── models/        # Database models
│       └── routes/       # API routes
├── railway.toml          # Railway config (NEW)
└── railway.json          # Old config
