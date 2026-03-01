# TODO: Render Deployment Setup

## Completed:
- [x] Analyze project structure and identify tech stack
- [x] Get GitHub repo link and environment variable details
- [x] Create render.yaml file for Render deployment
- [x] Document environment variables for Render dashboard
- [x] Provide MongoDB Atlas IP whitelist instructions
- [x] Provide UptimeRobot setup instructions for Render

## Pending:
- [x] Push changes to GitHub (Verified: render.yaml is on GitHub - commit 384957d)

---

## Tech Stack Detected:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) - MongoDB Atlas
- **Frontend**: HTML/CSS/JS (static files served from backend)
- **Backend Location**: `backend/` folder
- **Entry Point**: `backend/server.js`

## GitHub Repository:
- https://github.com/pujarollosaikiran1212-byte/nature-nourish (Public)

---

## ✅ render.yaml Created: backend/render.yaml

### Environment Variables to Add in Render Dashboard:

| Key | Value | Notes |
|-----|-------|-------|
| MONGODB_URI | mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname> | Same as Railway |
| PORT | 10000 | Render assigns this port automatically |
| NODE_ENV | production | Optional but recommended |

### Steps to Connect MongoDB Atlas with Render:

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Navigate to Network Access → IP Access List
3. Add IP Address: Click "Add IP Address"
4. Enter: 0.0.0.0/0 (allows access from anywhere)
5. Click Confirm

---

## UptimeRobot Setup for Render:

1. Sign up at https://uptimerobot.com
2. Add New Monitor:
   - Monitor Type: HTTP(s)
   - Friendly Name: Nature Nourish API (Render)
   - URL: https://your-app.onrender.com/api.health
     (Replace with your actual Render URL after deployment)
   - Monitoring Interval: 5 minutes
3. Click Create Monitor

---

## Next Steps:

1. Push to GitHub:

git add backend/render.yaml
git commit -m "Add Render deployment configuration"
git push origin main

2. Connect to Render:
   - Go to https://dashboard.render.com
   - Click "New Web Service"
   - Connect your GitHub repository
   - Select the backend folder
   - Add the environment variables (MONGODB_URI)
   - Click "Deploy"

3. MongoDB Atlas: Whitelist IP 0.0.0.0/0

4. UptimeRobot: Set up monitor with your Render URL
