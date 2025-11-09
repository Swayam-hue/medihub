# Deployment Guide for MediHub on Render

This guide will walk you through deploying your MediHub application on Render using Docker.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **Convex Account** - Your Convex deployment URL
4. **Clerk Account** - Your Clerk API keys

## Step 1: Prepare Your Repository

### 1.1 Push Your Code to GitHub

Make sure all your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Add Dockerfile and deployment files"
git push origin main
```

### 1.2 Verify Files Are Present

Ensure these files are in your repository:
- ✅ `Dockerfile`
- ✅ `.dockerignore`
- ✅ `render.yaml` (optional but helpful)
- ✅ `package.json`
- ✅ `next.config.ts`

## Step 2: Get Your Environment Variables

### 2.1 From Your `.env.local` File

Copy these values from your local `.env.local` file:

```
NEXT_PUBLIC_CONVEX_URL=https://your-app.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... or pk_live_...
CLERK_SECRET_KEY=sk_test_... or sk_live_...
CLERK_FRONTEND_API_URL=https://your-app.clerk.accounts.dev
```

**Note:** Invite codes default to:
- `ASHA_INVITE_CODE=ASHA2025`
- `ADMIN_INVITE_CODE=ADMIN2025`

You can override these in Render if needed.

## Step 3: Deploy on Render

### 3.1 Sign Up / Log In to Render

1. Go to [https://render.com](https://render.com)
2. Click "Get Started" or "Log In"
3. Sign up with GitHub (recommended) or email

### 3.2 Create a New Web Service

1. Click the **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository (`medihub` or your repo name)
5. Click **"Connect"**

### 3.3 Configure the Service

Fill in the following details:

#### Basic Settings:
- **Name**: `medihub` (or your preferred name)
- **Region**: Choose closest to your users (e.g., `Oregon`, `Frankfurt`)
- **Branch**: `main` (or `master` if that's your default branch)
- **Root Directory**: Leave empty (if your files are in root)

#### Build & Deploy Settings:
- **Environment**: Select **"Docker"**
- **Dockerfile Path**: `Dockerfile` (should auto-detect)
- **Docker Context**: `.` (root directory)

#### Plan:
- **Starter Plan**: $7/month (always on, no spin-down)
- **Free Plan**: 750 hours/month (spins down after inactivity)

### 3.4 Set Environment Variables

Click on **"Environment"** tab and add these variables:

#### Required Variables:

1. **NEXT_PUBLIC_CONVEX_URL**
   - Value: Your Convex deployment URL
   - Example: `https://your-app.convex.cloud`
   - **Important**: Make sure this is set correctly

2. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
   - Value: From your `.env.local` file
   - Format: `pk_test_...` or `pk_live_...`

3. **CLERK_SECRET_KEY**
   - Value: From your `.env.local` file
   - Format: `sk_test_...` or `sk_live_...`
   - **Important**: Mark this as "Secret" in Render

4. **CLERK_FRONTEND_API_URL**
   - Value: From your `.env.local` file
   - Format: `https://your-app.clerk.accounts.dev`

#### Optional Variables (with defaults):

5. **ASHA_INVITE_CODE**
   - Value: `ASHA2025` (or your custom code)
   - Default: `ASHA2025`

6. **ADMIN_INVITE_CODE**
   - Value: `ADMIN2025` (or your custom code)
   - Default: `ADMIN2025`

7. **NODE_ENV**
   - Value: `production`
   - Usually auto-set, but you can add it

### 3.5 Deploy

1. Review all settings
2. Click **"Create Web Service"**
3. Render will start building your Docker image
4. Monitor the build logs for any errors

## Step 4: Configure Clerk for Production

### 4.1 Update Clerk Allowed Origins

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Settings** → **Paths**
4. Add your Render URL to **Allowed Origins**:
   - Format: `https://medihub.onrender.com` (or your service name)
   - Or your custom domain if you set one up

### 4.2 Update Redirect URLs (if needed)

1. In Clerk Dashboard → **Settings** → **Paths**
2. Add your Render URL to:
   - **After Sign-In URL**: `https://your-render-url.onrender.com/after-signin`
   - **After Sign-Up URL**: `https://your-render-url.onrender.com/after-signin`

## Step 5: Verify Deployment

### 5.1 Check Build Status

1. In Render dashboard, check the **"Logs"** tab
2. Wait for build to complete (usually 3-5 minutes)
3. Look for: `Build successful` or `Deployed successfully`

### 5.2 Test Your Application

1. Click on your service URL (e.g., `https://medihub.onrender.com`)
2. Test the following:
   - ✅ Landing page loads
   - ✅ Sign in works
   - ✅ Admin portal accessible
   - ✅ ASHA portal accessible
   - ✅ Location dropdown works in admin
   - ✅ Records display correctly

## Step 6: Optional - Custom Domain

### 6.1 Add Custom Domain

1. In Render dashboard → Your Service → **Settings**
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `medihub.yourdomain.com`)
5. Follow DNS configuration instructions

### 6.2 Update DNS Records

Add the CNAME record as instructed by Render:
- **Type**: CNAME
- **Name**: `medihub` (or subdomain)
- **Value**: `your-service.onrender.com`

### 6.3 Update Clerk

After DNS propagates (can take up to 48 hours):
1. Update Clerk allowed origins with your custom domain
2. Update redirect URLs if needed

## Troubleshooting

### Build Fails

**Issue**: Docker build fails
- **Solution**: Check logs for specific errors
- Common issues:
  - Missing dependencies in `package.json`
  - Build script errors
  - Node version mismatch

### Application Won't Start

**Issue**: Service shows "Unhealthy" or crashes
- **Solution**: 
  - Check environment variables are all set
  - Verify `NEXT_PUBLIC_CONVEX_URL` is correct
  - Check Clerk keys are valid
  - Review logs for specific error messages

### Can't Access Admin/ASHA Portals

**Issue**: Redirected to unauthorized page
- **Solution**:
  - Verify role is set correctly in Clerk
  - Check middleware is working
  - Ensure Clerk allowed origins include Render URL

### Convex Connection Issues

**Issue**: Data not loading
- **Solution**:
  - Verify `NEXT_PUBLIC_CONVEX_URL` is correct
  - Check Convex deployment is active
  - Ensure Convex auth is configured correctly

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk dashboard
- [ ] `CLERK_SECRET_KEY` - From Clerk dashboard (mark as secret)
- [ ] `CLERK_FRONTEND_API_URL` - Your Clerk frontend API URL
- [ ] `ASHA_INVITE_CODE` - Optional (defaults to ASHA2025)
- [ ] `ADMIN_INVITE_CODE` - Optional (defaults to ADMIN2025)
- [ ] `NODE_ENV` - Set to `production`

## Useful Render Features

### Auto-Deploy

Render automatically deploys when you push to your main branch. You can:
- Disable auto-deploy in settings
- Set up manual deploys only
- Configure branch-specific deployments

### Logs

Access real-time logs:
- **Build Logs**: See Docker build process
- **Runtime Logs**: See application logs in real-time

### Metrics

Monitor your service:
- CPU usage
- Memory usage
- Request count
- Response times

## Cost Information

### Free Tier
- 750 hours/month
- Service spins down after 15 minutes of inactivity
- Good for testing and development

### Starter Plan ($7/month)
- Always on
- No spin-down
- Better for production use
- 512 MB RAM
- 0.5 CPU

## Support

If you encounter issues:
1. Check Render documentation: [https://render.com/docs](https://render.com/docs)
2. Review build logs for errors
3. Verify all environment variables are set correctly
4. Check Clerk and Convex dashboards for service status

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domain (optional)
3. Set up CI/CD for automatic deployments
4. Configure backups for your Convex database
5. Review and optimize performance

---

**Congratulations!** Your MediHub application should now be live on Render! 🎉

