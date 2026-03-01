# Keep Railway App Awake - Free Solution

## Why Railway Goes to Sleep
Railway's free tier puts apps to sleep after 7 days of inactivity. This causes the "site can't be reached" error when customers try to access your site.

## Solution: Use cron-job.org (Free)

### Step 1: Create a cron-job.org account
1. Go to https://cron-job.org
2. Sign up for a free account

### Step 2: Create a new cron job
1. Log in to your cron-job.org account
2. Click "Create cronjob"
3. Fill in the details:
   - **Title**: Nature Nourish Keep Awake
   - **URL**: `https://nature-nourish-production.up.railway.app/api/health`
   - **Schedule**: Every 5 minutes (or Every 10 minutes)
   - **HTTP Method**: GET

### Step 3: Save the cron job
- Click "Create cronjob"
- Your Railway app will now be pinged every 5-10 minutes
- This keeps it from going to sleep

## Alternative: Use UptimeRobot (Free)

### Step 1: Create UptimeRobot account
1. Go to https://uptimerobot.com
2. Sign up for a free account

### Step 2: Add a new monitor
1. Click "Add New Monitor"
2. Fill in details:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Nature Nourish API
   - **URL**: `https://nature-nourish-production.up.railway.app/api/health`
   - **Monitoring Interval**: 5 minutes

### Step 3: Save
- Click "Create Monitor"
- UptimeRobot will ping your site every 5 minutes

## Your Railway URLs

- **API Base URL**: `https://nature-nourish-production.up.railway.app/api`
- **Admin Panel**: `https://nature-nourish-production.up.railway.app/admin`
- **Health Check**: `https://nature-nourish-production.up.railway.app/api/health`

## Deploy Updated Files

Make sure to deploy these updated files to your hosting:
1. `index.html` - Updated with Railway admin link
2. `script.js` - Updated with Railway API URL
3. `customer-portal.html` - Updated with Railway API URL

All files now point to Railway instead of Render!
