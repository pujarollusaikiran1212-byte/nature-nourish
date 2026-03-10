# ✅ COMPLETE FIX - Deploy Guide

## Files Fixed:
- checkout.html - ✅ Working with Railway API
- script.js - ✅ Uses Railway API URL  
- server.js - ✅ Has CORS & /place-order route
- src/config/db.js - ✅ MongoDB connection with default URI

---

## 🚂 RAILWAY DEPLOY STEPS:

### Step 1: Set MongoDB in Railway
Go to Railway Dashboard → Your Service → **Variables**

Add this variable:
```
Name: MONGODB_URI
Value: mongodb+srv://asus:01lWUs7yjxFnX126@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1&retryWrites=true&w=majority
```

### Step 2: Deploy Backend to Railway
Upload ALL files:
- server.js
- src/ (entire folder)
- package.json
- package-lock.json

### Step 3: Upload Frontend to naturenourish.in
- checkout.html (NEW FIXED)
- admin_deployed.html
- script.js
- index.html
- style.css

---

## How It Works:
```
naturenourish.in (website)
        ↓ fetch()
https://nature-nourish-production.up.railway.app
        ↓
MongoDB (saves orders)
        ↓
admin panel shows orders
```

---

## Test After Deploy:
1. Visit naturenourish.in
2. Add product → checkout → place order
3. Visit naturenourish.in/admin_deployed.html
4. Login with: admin123
5. See orders!
