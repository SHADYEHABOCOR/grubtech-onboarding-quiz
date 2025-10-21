# Netlify Deployment Guide - Grubtech Quiz

## ✅ Netlify is NOW Supported!

This project has been updated with **Netlify Serverless Functions** and **Netlify Blob Storage** for full compatibility.

---

## 🚀 Quick Deploy to Netlify (3 Minutes)

### Method 1: Deploy Button (Easiest)

Click this button to deploy instantly:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SHADYEHABOCOR/grubtech-onboarding-quiz)

**That's it!** Your app will be live in 2-3 minutes.

---

### Method 2: Netlify Dashboard (Recommended)

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repos
   - Select `grubtech-onboarding-quiz`

3. **Configure Build Settings**
   - **Base directory**: (leave empty)
   - **Build command**: (leave empty)
   - **Publish directory**: `public`
   - **Functions directory**: `netlify/functions` (auto-detected)

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site is live! 🎉

5. **Get Your URL**
   - Netlify gives you: `https://random-name-12345.netlify.app`
   - You can customize it: Site settings → Domain management → Options → Edit site name

---

### Method 3: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Deploy**
```bash
cd "/Users/shadyehab/Downloads/Review Form"
netlify deploy --prod
```

4. **Follow prompts**
   - Create & configure a new site
   - Publish directory: `public`
   - Done!

---

### Method 4: Drag & Drop

1. **Build locally** (if needed)
   - No build step required for this project!

2. **Go to Netlify Drop**
   - Visit https://app.netlify.com/drop

3. **Drag the ENTIRE project folder**
   - Drag `/Users/shadyehab/Downloads/Review Form`
   - Drop onto the Netlify page
   - Wait for upload
   - Done! 🎉

---

## 📋 What You Get

### Your Live URLs:
```
Homepage:     https://your-site.netlify.app
Quiz Form:    https://your-site.netlify.app/grubtech-onboarding-quiz.html
Admin Panel:  https://your-site.netlify.app/admin.html
```

### API Endpoints (Serverless Functions):
```
Submit:       https://your-site.netlify.app/api/submit
Get All:      https://your-site.netlify.app/api/responses
Get One:      https://your-site.netlify.app/api/responses/:id
Stats:        https://your-site.netlify.app/api/stats
Export CSV:   https://your-site.netlify.app/api/export/csv
```

---

## 🔧 How It Works

### Technology Stack:

1. **Frontend**: Static HTML/CSS/JS (in `public/` folder)
2. **Backend**: Netlify Serverless Functions (in `netlify/functions/`)
3. **Database**: Netlify Blob Storage (free persistent storage)
4. **Hosting**: Netlify CDN (global, fast, free SSL)

### Architecture:

```
User submits quiz
    ↓
Frontend sends to /api/submit
    ↓
Netlify redirects to /.netlify/functions/submit
    ↓
Function saves to Netlify Blob Storage
    ↓
Data persists permanently
    ↓
Admin dashboard reads from /api/responses
    ↓
Shows all submissions
```

---

## 💾 Data Storage

### Netlify Blob Storage (Included Free):

- **Storage**: 10GB free tier
- **Persistent**: Data never disappears
- **Fast**: Global CDN distribution
- **Secure**: Automatic encryption
- **No database needed**: Built into Netlify

### Where is data stored?

- Stored in Netlify's blob store under key: `quiz-responses`
- Automatically backed up by Netlify
- Accessible only through your functions
- Persists across deployments

---

## ✅ Verify Deployment

### Checklist:

1. **Test Homepage**
   - Go to `https://your-site.netlify.app`
   - Should see landing page with buttons

2. **Test Quiz Form**
   - Click "Take the Survey" or go to `/grubtech-onboarding-quiz.html`
   - Fill out all fields
   - Submit
   - Should see success message

3. **Test Admin Dashboard**
   - Click "View Admin Dashboard" or go to `/admin.html`
   - Should see statistics and response table
   - Your test response should appear

4. **Test Export**
   - Click "Export to CSV" in admin
   - CSV file should download

5. **Check Netlify Functions**
   - Go to Netlify dashboard → Functions tab
   - Should see 4 functions:
     - submit
     - responses
     - stats
     - export-csv
   - All should show "Active" status

---

## 🔍 Check for Missing Files

If something isn't working:

1. **Open Netlify Dashboard**
   - Go to your site
   - Click "Deploys"
   - Click on the latest deploy

2. **Scroll to "Deploy file browser"**
   - Browse your deployed files
   - Check that all files are present:
     - `public/index.html` ✓
     - `public/admin.html` ✓
     - `public/grubtech-onboarding-quiz.html` ✓
     - `.netlify/functions/submit.js` ✓
     - `.netlify/functions/responses.js` ✓
     - `.netlify/functions/stats.js` ✓
     - `.netlify/functions/export-csv.js` ✓

3. **Check Function Logs**
   - Go to Functions tab
   - Click on a function
   - Check logs for errors

4. **Download Deploy**
   - In Deploy file browser
   - Click "Download deploy" to get a zip
   - Verify all files are included

---

## 🆘 Troubleshooting

### Issue: Functions not working (404 errors)

**Solution:**
1. Check `netlify.toml` is in root directory
2. Check functions are in `netlify/functions/`
3. Check build logs: Netlify → Deploys → latest → Build log
4. Verify redirects are set up in `netlify.toml`

**Fix:**
```bash
# In Netlify dashboard
Site settings → Build & deploy → Post processing → Asset optimization
Disable "Pretty URLs"
```

### Issue: Admin dashboard shows no responses

**Solutions:**
1. Submit a test response first
2. Check browser console (F12) for errors
3. Verify API endpoints are working:
   - Visit: `https://your-site.netlify.app/api/responses`
   - Should see JSON response
4. Check Netlify function logs

### Issue: CORS errors

**Solution:** Already configured in `netlify.toml`
- If still seeing errors, check Network tab in browser
- Verify you're accessing from the same domain

### Issue: CSV export not working

**Causes:**
1. No responses in database yet
2. Function timeout (unlikely)

**Solutions:**
1. Submit at least one response
2. Check function logs for errors
3. Try accessing directly: `/api/export/csv`

### Issue: Data not persisting

**Check:**
1. Netlify Blobs enabled? (should be automatic)
2. Go to: Site settings → Environment variables
3. Blobs should be enabled by default

**Fix:**
- Contact Netlify support if blobs aren't working
- Or switch to Railway/Render (see SETUP_GUIDE.md)

### Issue: Build fails

**Common causes:**
1. Missing dependencies
2. Node version mismatch

**Solution:**
```bash
# In Netlify dashboard
Site settings → Build & deploy → Environment
Add environment variable:
NODE_VERSION = 18
```

### Issue: 404 on API routes

**Solution:**
Check `netlify.toml` redirects:
```toml
[[redirects]]
  from = "/api/submit"
  to = "/.netlify/functions/submit"
  status = 200
```

If missing, the file is corrupted. Redeploy.

---

## 🔐 Add Password Protection

Netlify makes this super easy!

### Method 1: Netlify Identity (Best)

1. **Enable Netlify Identity**
   - Site settings → Identity
   - Click "Enable Identity"

2. **Set Password for Admin Page**
   - Create a `_redirects` file in `public/`:
   ```
   /admin.html  200!  Role=admin
   ```

3. **Invite Users**
   - Site settings → Identity → Invite users
   - They'll get email to set password

4. **Add Login Widget**
   Add to `admin.html` before `</body>`:
   ```html
   <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

### Method 2: Basic Password (Simpler)

1. **Site settings → Visitor access**
2. **Set password** for entire site or specific pages
3. Done!

---

## 📊 Monitor Your Data

### View Blob Storage:

1. **Netlify CLI**
```bash
netlify blobs:list
netlify blobs:get quiz-responses responses
```

2. **Backup Data**
```bash
# Export to local file
netlify blobs:get quiz-responses responses > backup.json
```

3. **Restore Data**
```bash
# Import from local file
netlify blobs:set quiz-responses responses < backup.json
```

### Export via Admin Dashboard:
- Just click "Export to CSV"
- Do this weekly as backup

---

## 🎯 Next Steps

- [ ] Deploy to Netlify (choose method above)
- [ ] Test quiz submission
- [ ] Test admin dashboard
- [ ] Add password protection
- [ ] Customize domain name
- [ ] Share quiz URL with customers
- [ ] Set up weekly CSV backups

---

## 💰 Pricing

### Netlify Free Tier:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Serverless functions: 125k requests/month
- ✅ Blob storage: 10GB
- ✅ Free SSL certificate
- ✅ Custom domain

**For most use cases, FREE tier is more than enough!**

### When to Upgrade? ($19/month)
- 1M+ function invocations
- 100GB+ blob storage
- Need more build minutes
- Priority support

---

## 🔄 Auto-Deploy on Git Push

Already set up! Every time you push to GitHub:
1. Netlify automatically detects the change
2. Rebuilds your site
3. Deploys new version
4. Takes ~2 minutes

**How to disable:**
- Site settings → Build & deploy → Build settings
- Click "Stop builds"

---

## 🌐 Custom Domain

### Free Netlify Subdomain:
1. Site settings → Domain management
2. Click "Options" → "Edit site name"
3. Choose: `grubtech-quiz.netlify.app`

### Your Own Domain:
1. Buy domain (Namecheap, Google Domains, etc.)
2. Site settings → Domain management → Add custom domain
3. Follow DNS setup instructions
4. Free SSL included!

---

## 📈 Analytics

### Enable Netlify Analytics:
1. Site settings → Analytics
2. Enable "Netlify Analytics" ($9/month)
3. See traffic, bandwidth, popular pages

### Free Alternative - Google Analytics:
Add to `public/index.html`, `admin.html`, and quiz form:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🚀 Performance Optimization

### Already Optimized:
- ✅ Global CDN (fast worldwide)
- ✅ Automatic compression
- ✅ HTTP/2 enabled
- ✅ Free SSL/TLS

### Further Optimization:
1. **Asset Optimization**
   - Site settings → Build & deploy → Post processing
   - Enable "Bundle CSS" and "Minify JS"

2. **Cache Control**
   Already configured in `netlify.toml`

---

## 📞 Need Help?

### Resources:
- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **This Project Docs**: See [README.md](README.md)

### Common Commands:
```bash
# Test locally
netlify dev

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod

# View logs
netlify functions:log submit

# List all sites
netlify sites:list
```

---

## 🎉 You're All Set!

### Quick Reference:

**Deploy**: https://app.netlify.com/start/deploy?repository=https://github.com/SHADYEHABOCOR/grubtech-onboarding-quiz

**After Deploy:**
- Quiz: `https://your-site.netlify.app/grubtech-onboarding-quiz.html`
- Admin: `https://your-site.netlify.app/admin.html`

**Backup Data:**
```bash
netlify blobs:get quiz-responses responses > backup-$(date +%Y%m%d).json
```

---

**Netlify deployment is now fully supported!** 🎯

Your quiz app will work perfectly with:
- ✅ Persistent data storage (Netlify Blobs)
- ✅ Serverless functions (automatic scaling)
- ✅ Free SSL and CDN
- ✅ Auto-deploy on git push
- ✅ Zero configuration needed

**Deploy now and start collecting feedback!** 🚀
