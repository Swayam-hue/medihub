# Quick Start - Deploy to Render

## 🚀 Fast Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Dockerfile for Render deployment"
git push origin main
```

### 2. Go to Render
1. Visit [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository

### 3. Configure Service
- **Name**: `medihub`
- **Environment**: **Docker**
- **Dockerfile Path**: `Dockerfile` (auto-detected)
- **Plan**: Choose Free or Starter ($7/month)

### 4. Add Environment Variables
Click **"Environment"** and add:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url_from_env_local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_from_env_local
CLERK_SECRET_KEY=your_secret_from_env_local
CLERK_FRONTEND_API_URL=your_clerk_url_from_env_local
ASHA_INVITE_CODE=ASHA2025
ADMIN_INVITE_CODE=ADMIN2025
NODE_ENV=production
```

### 5. Deploy
Click **"Create Web Service"** and wait for build (3-5 minutes)

### 6. Update Clerk
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Settings → Paths
3. Add your Render URL to **Allowed Origins**
   - Example: `https://medihub.onrender.com`

### 7. Test
Visit your Render URL and test the application!

---

**Need more details?** See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

