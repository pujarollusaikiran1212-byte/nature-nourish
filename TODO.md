# 🚂 RAILWAY DEPLOY GUIDE

## ✅ All Code Ready!

---

## DEPLOY STEPS:

### Step 1: Set MongoDB in Railway
Go to Railway Dashboard → Your Service → **Variables** tab

Add this variable:
- **Name:** `MONGODB_URI`
- **Value:** `mongodb+srv://asus:01lWUs7yjxFnX126@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1`

### Step 2: Deploy Backend to Railway
Upload these files:
- server.js
- src/ folder (config, models, routes)
- package.json
- package-lock.json

### Step 3: Upload Frontend to naturenourish.in
- checkout.html
- script.js
- index.html
- style.css

---

## Flow:
```
naturenourish.in → Railway Backend → MongoDB
                     ↓
            Orders saved to MongoDB
                     ↓
        Admin panel shows orders ✅
```

---

## Test:
1. Set MONGODB_URI in Railway (Step 1)
2. Deploy backend (Step 2)
3. Upload frontend (Step 3)
4. Place order at naturenourish.in/checkout.html
5. Check admin panel at naturenourish.in/admin.html
