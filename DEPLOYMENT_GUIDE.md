# 🚀 Petstore Deployment Guide for Render

## Overview

This guide walks you through deploying the Petstore application (Spring Boot backend + React frontend) on Render.

**What you'll deploy:**
- ✅ Backend: Spring Boot API running on Docker
- ✅ Frontend: React/Vite SPA with static hosting
- ✅ Database: PostgreSQL (Render's free tier)

---

## Prerequisites

1. **Render Account**: Sign up at https://render.com (free tier available)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Git configured locally** with your GitHub credentials

---

## Step-by-Step Deployment

### **Step 1: Connect Your GitHub Repository to Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Select **"Connect a repository"**
4. Authorize Render to access your GitHub account
5. Select the **kirbyjoshh/petstore** repository
6. Click **"Connect"**

### **Step 2: Review and Deploy the Blueprint**

The system will read `render.yaml` automatically.

You'll see a preview showing:
- **petstore-backend** (Docker web service)
- **petstore-frontend** (Static site)
- **petstore-db** (PostgreSQL database)

**Click "Deploy"** to start the deployment process.

### **Step 3: Configure Environment Variables** (Important!)

After deployment starts, you need to **manually set the environment variables** that reference the deployed services:

#### **For Backend:**

1. Go to **petstore-backend** service → **Environment**
2. Update `CORS_ALLOWED_ORIGINS` to:
   ```
   https://petstore-frontend-xxx.onrender.com
   ```
   (Replace `xxx` with your actual frontend URL from the deployment)

3. Update or add any other secrets if needed

#### **For Frontend:**

1. Go to **petstore-frontend** service → **Environment**
2. Set `VITE_API_BASE_URL` to:
   ```
   https://petstore-backend-yyy.onrender.com
   ```
   (Replace `yyy` with your actual backend URL)

3. **Important**: Make sure to click **"Redeploy"** after changing these variables

### **Step 4: Monitor Deployment**

1. **Backend**: Wait for Docker build to complete (~5-10 minutes)
   - Check logs to ensure the Spring Boot app starts successfully
   - Should see "Flyway migration" messages if migrations run correctly

2. **Frontend**: Static build should complete in ~2 minutes
   - Check for any build errors in the logs

3. **Database**: PostgreSQL will be automatically provisioned
   - Connection details are injected automatically

### **Step 5: Test Your Deployment**

1. Visit your **frontend URL**: `https://petstore-frontend-xxx.onrender.com`
2. Check if the app loads and shows pets
3. Try adding a pet via the Admin console (`/admin`)
4. Verify the backend API is responding by opening your browser's Network tab

**If something fails:**
- Check the **Logs** tab in each service
- Common issues:
  - ❌ Database connection error → Check `CORS_ALLOWED_ORIGINS` and database credentials
  - ❌ 404 on API calls → Check `VITE_API_BASE_URL` is set correctly in frontend environment
  - ❌ Static files not found → Check `staticPublishPath: frontend/dist` in `render.yaml`

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│   Your Browser (User)               │
└────────────┬────────────────────────┘
             │
             ├─────────────────────────────────────────┐
             │                                         │
             ▼                                         ▼
   ┌──────────────────────┐          ┌─────────────────────────────┐
   │  petstore-frontend   │          │   petstore-backend          │
   │  (Static Site)       │────────▶ │   (Spring Boot Docker)      │
   │  React/Vite Built    │          │   Port: 8080                │
   │                      │          │                             │
   │  Location:           │          │  Health: /api/pets          │
   │  frontend/dist       │          └────────────┬────────────────┘
   └──────────────────────┘                       │
                                                  │
                                                  ▼
                                        ┌──────────────────────┐
                                        │   petstore-db        │
                                        │   PostgreSQL         │
                                        │                      │
                                        │  Flyway Migrations   │
                                        └──────────────────────┘
```

---

## Important Notes

### Database Management

- The `petstore-db` PostgreSQL instance will have migrations run automatically
- Flyway will execute all SQL files in `backend/src/main/resources/db/migration/`
- **Never delete the database** unless you want to reset everything

### Redeploying After Changes

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add -A
   git commit -m "Your message"
   git push
   ```
3. Go to **Render Dashboard** → Your service → Click **"Redeploy"**
4. Or enable **"Auto-Deploy"** for automatic deployments on push

### Environment Variables Reference

| Variable | Service | Value |
|----------|---------|-------|
| `CORS_ALLOWED_ORIGINS` | Backend | Frontend URL |
| `VITE_API_BASE_URL` | Frontend | Backend URL |
| `DB_HOST` | Backend | Auto-injected from DB |
| `DATABASE_USERNAME` | Backend | Auto-injected from DB |
| `DATABASE_PASSWORD` | Backend | Auto-injected from DB |
| `DB_SSL_MODE` | Backend | `require` (for production) |
| `PORT` | Backend | `8080` |

### Monitoring & Debugging

**View Logs:**
- Render Dashboard → Service → "Logs" tab
- Shows real-time deployment and runtime logs

**Check Health:**
- Backend: `https://your-backend-url.onrender.com/api/pets`
- Should return 200 with pet data

**Common Issues & Fixes:**

| Issue | Cause | Fix |
|-------|-------|-----|
| Frontend shows "Cannot connect to API" | Wrong `VITE_API_BASE_URL` | Update env var and redeploy |
| 500 error from backend | Database connection failed | Check DB credentials in logs |
| Build fails | Missing dependencies | Run `npm install` locally and push |
| Frontend shows 404 | Wrong `staticPublishPath` | Verify `frontend/dist` exists |

---

## Cost Considerations (Free Tier)

- **Backend**: Free tier available (limited compute)
- **Frontend**: Free tier available (static hosting)
- **Database**: Free tier PostgreSQL (limited storage/connections)
- **Limits**: Services spin down after 15 min of inactivity

For production use, upgrade to paid plans.

---

## Next Steps

1. ✅ Deploy to Render using this guide
2. ✅ Test all CRUD operations (Create, Read, Update, Delete)
3. ✅ Monitor logs for any errors
4. ✅ Set up custom domain (optional, in Render dashboard)
5. ✅ Enable auto-deploy from GitHub (optional)

---

## Support

For issues:
1. Check [Render Documentation](https://render.com/docs)
2. Review your service logs in Render Dashboard
3. Verify all environment variables are set correctly
4. Ensure `render.yaml` is valid YAML format

Happy deploying! 🎉
