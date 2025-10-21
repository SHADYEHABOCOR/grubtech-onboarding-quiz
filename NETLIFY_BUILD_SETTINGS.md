# Netlify Build Settings

When deploying to Netlify, use these exact settings:

## 🔧 Build Settings

### Branch to Deploy
```
main
```
(or `master` if that's your default branch)

### Base Directory
```
(leave empty)
```

### Build Command
```
(leave empty)
```
**Note:** No build command needed - this is a static site with serverless functions

### Publish Directory
```
public
```

### Functions Directory
```
netlify/functions
```
**Note:** This should be auto-detected from `netlify.toml`

---

## 📋 Step-by-Step Configuration

When you see the Netlify configuration screen:

1. **Repository Settings**
   - ✅ Repository: `SHADYEHABOCOR/grubtech-onboarding-quiz`
   - ✅ Branch: `main`
   - ✅ Base directory: (leave blank)

2. **Build Settings**
   - ✅ Build command: (leave blank)
   - ✅ Publish directory: `public`
   - ✅ Functions directory: `netlify/functions` (auto-detected)

3. **Advanced Build Settings** (Optional)
   - Click "Show advanced" if you want to add:
   - Node version: `18` (recommended but not required)

4. **Click "Deploy site"**

---

## 🎯 Visual Guide

```
┌─────────────────────────────────────────┐
│  Configure Your Site                     │
├─────────────────────────────────────────┤
│                                          │
│  Branch to deploy                        │
│  ┌────────────────────────────────────┐ │
│  │ main                            ▼  │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Base directory                          │
│  ┌────────────────────────────────────┐ │
│  │                                    │ │  ← Leave empty
│  └────────────────────────────────────┘ │
│                                          │
│  Build command                           │
│  ┌────────────────────────────────────┐ │
│  │                                    │ │  ← Leave empty
│  └────────────────────────────────────┘ │
│                                          │
│  Publish directory                       │
│  ┌────────────────────────────────────┐ │
│  │ public                             │ │  ← Type: public
│  └────────────────────────────────────┘ │
│                                          │
│  Functions directory                     │
│  ┌────────────────────────────────────┐ │
│  │ netlify/functions                  │ │  ← Auto-detected
│  └────────────────────────────────────┘ │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │      Deploy site                │   │  ← Click here
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## ⚙️ Alternative: Manual Configuration After Deploy

If you already deployed and need to change settings:

1. **Go to Site Settings**
   - Netlify Dashboard → Your site → Site settings

2. **Build & Deploy → Continuous Deployment**
   - Click "Edit settings"
   - Update the fields as shown above

3. **Trigger Redeploy**
   - Deploys tab → "Trigger deploy" → "Deploy site"

---

## 🔍 Verify Configuration

After deployment, check:

1. **Functions Tab**
   - Should see 4 functions:
     - `submit`
     - `responses`
     - `stats`
     - `export-csv`
   - All should be "Active"

2. **Deploy Log**
   - Go to Deploys → Click latest deploy → View deploy log
   - Should see:
     ```
     ✔ Functions bundled successfully
     ✔ Site deployed successfully
     ```

3. **Test Endpoints**
   - Visit: `https://your-site.netlify.app/api/responses`
   - Should return: `{"success":true,"count":0,"responses":[]}`

---

## 🐛 Common Issues

### Issue: "No functions found"
**Solution:**
- Make sure `netlify.toml` is in the root directory
- Redeploy: Deploys → "Trigger deploy" → "Clear cache and deploy site"

### Issue: "404 on API routes"
**Solution:**
- Check `netlify.toml` exists and has redirects
- Verify publish directory is `public` (not root)

### Issue: Build fails
**Solution:**
- Leave build command empty (no build needed!)
- Make sure branch name is correct (`main` not `master`)

---

## 📦 Environment Variables (Optional)

For production, you can add:

1. **Go to Site Settings → Environment Variables**
2. **Add:**
   - `NODE_VERSION` = `18`
   - (No other variables needed!)

---

## ✅ Quick Checklist

Before clicking "Deploy site":

- [ ] Branch: `main`
- [ ] Base directory: (empty)
- [ ] Build command: (empty)
- [ ] Publish directory: `public`
- [ ] Functions directory: `netlify/functions`
- [ ] `netlify.toml` is in your repo root
- [ ] All files committed and pushed to GitHub

---

## 🚀 That's It!

Click **"Deploy site"** and wait 2-3 minutes.

Your quiz will be live at: `https://[random-name].netlify.app`

You can customize the URL in: **Site settings → Domain management → Edit site name**

---

**Need more help?** See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) for the complete guide.
