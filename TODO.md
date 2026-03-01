# TODO: Railway Deployment

## Completed:
- [x] Updated all frontend files to use Railway URL
- [x] Removed Render configuration files (render.yaml)
- [x] Removed Vercel configuration files (vercel.json)

## Pending:
- [ ] Push changes to GitHub
- [ ] Railway will auto-deploy from GitHub
- [ ] Set up keep-awake service (cron-job.org or UptimeRobot)

---

## Tech Stack Detected:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) - MongoDB Atlas
- **Frontend**: HTML/CSS/JS (static files served from backend)
- **Entry Point**: `server.js`

## Railway URLs:
- **API Base**: `https://nature-nourish-production.up.railway.app/api`
- **Admin Panel**: `https://nature-nourish-production.up.railway.app/admin`

---

## Keep-Awake Setup (Important!)

Railway free tier puts apps to sleep after 7 days. Set up a free ping service:

### Option 1: cron-job.org
1. Go to https://cron-job.org
2. Create free account
3. Create new cron job:
   - URL: `https://nature-nourish-production.up.railway.app/api/health`
   - Schedule: Every 5 minutes

### Option 2: UptimeRobot
1. Go to https://uptimerobot.com
2. Create free account
3. Add monitor:
   - URL: `https://nature-nourish-production.up.railway.app/api/health`
   - Interval: 5 minutes

---

## Next Steps:

1. **Push to GitHub:**
```
bash
git add .
git commit -m "Update to Railway - remove Render config"
git push origin main
```

2. **Wait for Railway to deploy** - It will automatically rebuild from GitHub

3. **Set up keep-awake** - Use cron-job.org or UptimeRobot

4. **Test your site:**
   - API: `https://nature-nourish-production.up.railway.app/api/health`
   - Admin: `https://nature-nourish-production.up.railway.app/admin`
