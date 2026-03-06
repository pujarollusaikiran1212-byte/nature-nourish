# How to Fix MongoDB Connection on Railway

## Problem
The MongoDB database is disconnected from your Railway backend, so orders cannot be saved or retrieved.

---

## Step-by-Step Fix

### Step 1: Go to Railway Dashboard
1. Open your browser
2. Visit: **https://railway.com/dashboard**
3. Log in to your Railway account

### Step 2: Find Your Project
1. Look for **`nature-nourish-production`** in your projects list
2. Click on it to open the project

### Step 3: Check Environment Variables
1. Click on the **"Variables"** tab (on the left sidebar)
2. Look for a variable named **`MONGODB_URI`**
3. It should look something like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/databasename
   ```

**If MONGODB_URI is missing:**
- Click **"New Variable"**
- Name: `MONGODB_URI`
- Value: Your MongoDB connection string (from MongoDB Atlas)

### Step 4: Redeploy the Service
1. Click on the **"Deployments"** tab (on the left sidebar)
2. You should see your recent deployments
3. Click the **"..."** button on the latest deployment
4. Select **"Redeploy"**
5. Wait for deployment to complete (may take 1-2 minutes)

### Step 5: Verify the Fix
1. Wait 1-2 minutes after redeployment
2. Open a new browser tab
3. Visit: **https://nature-nourish-production.up.railway.app/api/health**
4. You should see:
   ```json
   {"status":"OK","database":"Connected"}
   ```

---

## If Still Not Working

### Option A: Create New MongoDB Database on Railway
1. In Railway dashboard, click **"+ New"**
2. Search for **"MongoDB"**
3. Click **"MongoDB"** to add a new database
4. Once created, copy the connection string
5. Add it as `MONGODB_URI` in your service's Variables
6. Redeploy

### Option B: Check MongoDB Atlas
1. Go to **https://cloud.mongodb.com/**
2. Log in to your MongoDB Atlas account
3. Check if your cluster is running
4. Verify your IP is whitelisted (Network Access)
5. Check username/password is correct

---

## After Fix - Test
Run the test script:
```
node test-api-orders.js
```

You should see:
```
✓ API Health: { status: 'OK', database: 'Connected' }
✓ Orders count: X
```

---

## Need Help?
If you're still having issues, check:
1. Is your MongoDB Atlas cluster paused? (Free tier pauses after inactivity)
2. Is the connection string correct?
3. Are there any errors in Railway deployment logs?

