# ✅ Render Deployment Checklist

Complete this checklist before and after deploying to Render:

## Pre-Deployment (Local Testing)

- [ ] Backend builds locally: `mvn clean compile spring-boot:run -Dspring-boot.run.profiles=local`
- [ ] Frontend builds locally: `npm run build` in `frontend/` directory
- [ ] All tests pass: `npm test` in `frontend/`
- [ ] No build warnings or errors
- [ ] Git repository is clean: `git status` shows nothing
- [ ] All changes committed: `git log` shows your commits
- [ ] Code is pushed to GitHub: `git push` succeeds

## Render Setup

- [ ] Render account created and verified
- [ ] GitHub repository connected to Render
- [ ] `render.yaml` file exists and is valid YAML
- [ ] `backend/Dockerfile` exists and is valid
- [ ] Frontend `package.json` build script works locally

## During Deployment

- [ ] Blueprint deployment started from Render Dashboard
- [ ] Waiting for services to build (~10 minutes total)
- [ ] Backend Docker build completes successfully
- [ ] Frontend build completes successfully
- [ ] Database is provisioned and migrated

## Post-Deployment Configuration (Critical!)

- [ ] Backend `CORS_ALLOWED_ORIGINS` updated with frontend URL
- [ ] Frontend `VITE_API_BASE_URL` updated with backend URL
- [ ] Both services redeployed after env var changes
- [ ] Health check passes: `https://backend-url.onrender.com/api/pets`

## Testing Live Deployment

- [ ] Frontend URL loads without errors
- [ ] Pet list displays on homepage
- [ ] Admin console accessible at `/admin`
- [ ] Can create a new pet
- [ ] Can view pet details
- [ ] Can edit pet information
- [ ] Can delete a pet
- [ ] Can add pets to cart
- [ ] Checkout flow works
- [ ] No CORS errors in browser console

## Monitoring

- [ ] Backend logs show no errors
- [ ] Frontend logs show no errors
- [ ] Database logs show migrations completed
- [ ] No "Cannot connect to API" messages
- [ ] API responses are under 1 second

## Troubleshooting Notes

If deployment fails:

**Backend build fails:**
- Check `backend/Dockerfile` syntax
- Ensure `pom.xml` dependencies are valid
- Check Java version compatibility (currently Java 17)

**Frontend build fails:**
- Run `npm install` locally to verify dependencies
- Check `vite.config.ts` for syntax errors
- Ensure `tailwind.config.js` is valid

**API connection fails:**
- Verify `VITE_API_BASE_URL` ends with NO trailing slash (e.g., `https://url.onrender.com`)
- Check `CORS_ALLOWED_ORIGINS` includes the exact frontend URL
- Check backend logs for CORS error messages

**Database connection fails:**
- Verify `DB_SSL_MODE=require` is set
- Check database credentials in backend logs
- Ensure Flyway migrations completed: check logs for migration messages

## Useful Commands

```bash
# View local logs
git log --oneline

# Check current git branch
git branch

# Push to GitHub (triggers Render if auto-deploy enabled)
git push origin main

# View Render services (requires Render CLI)
render ps

# Tail logs (requires Render CLI)
render logs -s petstore-backend
```

## Post-Launch

- [ ] Set up custom domain (optional)
- [ ] Enable auto-deploy from GitHub
- [ ] Configure email alerts for deployment failures
- [ ] Document the production URLs
- [ ] Set up monitoring/alerts
