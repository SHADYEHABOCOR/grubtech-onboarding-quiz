# Quick Setup Guide - Grubtech Quiz Backend

## 🚀 5-Minute Setup

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Go to https://nodejs.org
2. Download the LTS version (18.x or higher)
3. Install it

### Step 2: Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
🚀 Grubtech Quiz API running on port 3000
📊 Admin dashboard: http://localhost:3000/admin.html
📝 Quiz form: http://localhost:3000/grubtech-onboarding-quiz.html
```

### Step 4: Test It Out
Open your browser and visit:
- **http://localhost:3000** - Homepage
- **http://localhost:3000/grubtech-onboarding-quiz.html** - Take the quiz
- **http://localhost:3000/admin.html** - View admin dashboard

---

## 🌐 Deploy Online (Choose ONE Method)

### ✅ Method 1: Railway.app (EASIEST - Recommended)

**Why Railway?** It's specifically designed for Node.js apps with persistent storage and has a generous free tier.

1. **Create Account**
   - Go to https://railway.app
   - Click "Start a New Project"
   - Login with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select `grubtech-onboarding-quiz`
   - Railway auto-detects everything
   - Click "Deploy"

3. **Add a Domain**
   - Click on your project
   - Go to "Settings" tab
   - Under "Domains", click "Generate Domain"
   - Copy your URL: `https://your-app.up.railway.app`

4. **Done!** 🎉
   - Your app is live
   - Data persists across restarts
   - Free tier: 500 hours/month

**Your URLs:**
- Quiz: `https://your-app.up.railway.app/grubtech-onboarding-quiz.html`
- Admin: `https://your-app.up.railway.app/admin.html`

---

### ✅ Method 2: Render.com (Also Good)

**Why Render?** Great for Node.js, has persistent disk storage, very reliable.

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository `grubtech-onboarding-quiz`
   - Configure:
     - **Name**: `grubtech-quiz`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Persistent Disk** (IMPORTANT!)
   - Scroll down to "Disk"
   - Click "Add Disk"
   - **Name**: `quiz-data`
   - **Mount Path**: `/opt/render/project/src/data`
   - **Size**: 1 GB
   - Click "Save"

4. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes
   - Copy your URL: `https://grubtech-quiz.onrender.com`

5. **Done!** 🎉
   - Free tier includes persistent storage
   - Auto-deploys on GitHub push

**Your URLs:**
- Quiz: `https://grubtech-quiz.onrender.com/grubtech-onboarding-quiz.html`
- Admin: `https://grubtech-quiz.onrender.com/admin.html`

**Note:** Free tier spins down after inactivity. First load may take 30 seconds.

---

### ✅ Method 3: Glitch.com (Beginner Friendly)

**Why Glitch?** No GitHub needed, edit code in browser, instant deployment.

1. **Create Account**
   - Go to https://glitch.com
   - Sign up (free)

2. **Create New Project**
   - Click "New Project" → "glitch-hello-node"
   - This creates a starter Node.js app

3. **Upload Your Code**
   - Click "Tools" → "Import from GitHub"
   - Enter: `SHADYEHABOCOR/grubtech-onboarding-quiz`
   - Click "OK"

4. **View Your App**
   - Click "Share" → "Live App"
   - Copy your URL: `https://your-project.glitch.me`

5. **Done!** 🎉
   - App is live instantly
   - Edit code in browser
   - Free unlimited hosting

**Your URLs:**
- Quiz: `https://your-project.glitch.me/grubtech-onboarding-quiz.html`
- Admin: `https://your-project.glitch.me/admin.html`

**Limitations:** Data resets every 5 minutes of inactivity. Best for testing.

---

### ✅ Method 4: Cyclic.sh (Free Persistent Storage)

**Why Cyclic?** Free tier, persistent storage, easy deployment.

1. **Create Account**
   - Go to https://www.cyclic.sh
   - Click "Deploy Now"
   - Login with GitHub

2. **Link Repository**
   - Click "Link Your Own"
   - Select `grubtech-onboarding-quiz`
   - Click "Connect"

3. **Deploy**
   - Cyclic auto-deploys
   - Wait 2-3 minutes
   - Copy your URL: `https://your-app.cyclic.app`

4. **Done!** 🎉
   - Free persistent storage
   - Auto-deploys on push

---

### ❌ NOT RECOMMENDED: Vercel / Netlify

**Why not?** These are serverless platforms. Your quiz needs:
- Persistent storage (JSON file)
- Running server process
- File system access

Vercel/Netlify are great for static sites, but NOT for Node.js apps with databases.

**Use Railway or Render instead!**

---

## 📊 Access Your Admin Dashboard

After deployment, your URLs will be:
- **Quiz Form**: `https://your-app-url.com/grubtech-onboarding-quiz.html`
- **Admin Dashboard**: `https://your-app-url.com/admin.html`

**Save these URLs!**
- Share quiz form with customers
- Keep admin dashboard for yourself

---

## 🔄 Microsoft Forms Integration

### Option A: Replace Microsoft Forms (Easiest)
Just use the provided quiz form instead. It's better looking and already connected!

### Option B: Keep Microsoft Forms + Connect to This Backend

1. **Get Your Deployment URL**
   - After deploying to Railway/Render, copy your URL
   - Example: `https://grubtech-quiz.up.railway.app`

2. **Set Up Power Automate** (Microsoft Flow)
   - Go to https://flow.microsoft.com
   - Click "Create" → "Automated cloud flow"
   - Trigger: "When a new response is submitted (Microsoft Forms)"
   - Add action: "HTTP"

3. **Configure HTTP Action**
   - **Method**: POST
   - **URI**: `https://your-app-url/api/submit`
   - **Headers**:
     ```json
     {
       "Content-Type": "application/json"
     }
     ```
   - **Body**: Map your form fields:
     ```json
     {
       "timestamp": "@{utcNow()}",
       "customerName": "@{triggerOutputs()?['body/responder']}",
       "brandName": "@{triggerOutputs()?['body/r1234']}",
       "onboardingSpecialist": "@{triggerOutputs()?['body/r5678']}",
       "calledBy": "@{triggerOutputs()?['body/r9012']}",
       "posName": "@{triggerOutputs()?['body/r3456']}",
       "q1": "@{triggerOutputs()?['body/r7890']}",
       "q1_text": "@{triggerOutputs()?['body/r7890']}",
       "q2": "@{triggerOutputs()?['body/r2345']}",
       "q3": "@{triggerOutputs()?['body/r6789']}",
       "q3_text": "@{triggerOutputs()?['body/r6789']}",
       "q4": "@{triggerOutputs()?['body/r0123']}",
       "q4_text": "@{triggerOutputs()?['body/r0123']}",
       "q5": "@{triggerOutputs()?['body/r4567']}",
       "q5_text": "@{triggerOutputs()?['body/r4567']}",
       "q6": "@{triggerOutputs()?['body/r8901']}",
       "totalScore": 25,
       "percentage": 83
     }
     ```

   **Note:** Replace `r1234`, `r5678`, etc. with your actual Microsoft Forms question IDs.

4. **Find Question IDs**
   - In Power Automate, add "Get response details" action first
   - It will show you all available fields with their IDs
   - Use those IDs in the HTTP body

5. **Test It**
   - Submit a test response in Microsoft Forms
   - Check your admin dashboard
   - It should appear!

### Option C: Manual Import from CSV

If you have existing responses in Microsoft Forms:

1. **Export from Microsoft Forms**
   - Open your form → "Responses" tab
   - Click "Open in Excel"
   - Save as CSV

2. **Convert to JSON**
   - Use https://csvjson.com/csv2json
   - Upload your CSV
   - Download JSON

3. **Import Using Postman or cURL**

**Using cURL:**
```bash
curl -X POST https://your-app-url/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2024-01-15T10:30:00Z",
    "customerName": "John Doe",
    "brandName": "Restaurant ABC",
    "onboardingSpecialist": "Jane Smith",
    "calledBy": "Dina Abdelaziz",
    "posName": "Square",
    "q1": "5",
    "q1_text": "Very satisfied",
    "q2": "5",
    "q3": "5",
    "q3_text": "Yes",
    "q4": "5",
    "q4_text": "Yes",
    "q5": "5",
    "q5_text": "Yes",
    "q6": "Everything was great!",
    "totalScore": 30,
    "percentage": 100
  }'
```

**Using Postman:**
- Create new POST request
- URL: `https://your-app-url/api/submit`
- Headers: `Content-Type: application/json`
- Body: Paste your JSON response
- Send

---

## ✅ Verify Everything Works

### Test Checklist:

1. **Submit Test Response**
   - Go to quiz form
   - Fill out all fields
   - Submit
   - Check for success message

2. **Check Admin Dashboard**
   - Go to admin.html
   - See if response appears in table
   - Check statistics update

3. **Test Search**
   - Type customer name in search box
   - Verify filtering works

4. **View Details**
   - Click "View" button
   - Check all data displays correctly

5. **Export CSV**
   - Click "Export to CSV"
   - File should download
   - Open in Excel/Sheets to verify

6. **Delete Response**
   - Click "Delete" on test response
   - Confirm deletion
   - Verify it's removed from list

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution**: You're using the wrong URL
- ✅ Correct: `http://localhost:3000`
- ❌ Wrong: `http://localhost:3000/server.js`

### Issue: "Failed to fetch" in browser
**Cause**: Server isn't running
**Solution**:
```bash
npm start
```

### Issue: "Port 3000 already in use"
**Solution (Mac/Linux):**
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution (Windows):**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Admin dashboard is empty
**Solutions:**
1. Open browser console (F12) - check for errors
2. Make sure you submitted at least one response
3. Click "Refresh" button
4. Check if backend URL is correct

### Issue: Responses not saving on Railway/Render
**Solution**:
- **Railway**: Data saves automatically
- **Render**: Make sure you added the persistent disk (see Method 2)

### Issue: App sleeping/slow on Render
**Cause**: Free tier spins down after 15 min inactivity
**Solutions:**
- First load takes 30-60 seconds
- Upgrade to paid tier ($7/month) for always-on
- Use Railway instead (better free tier)

### Issue: CSV export downloads empty file
**Cause**: No responses in database
**Solution**: Submit at least one quiz response first

### Issue: CORS errors
**Cause**: Frontend can't connect to backend
**Solution**: Check that you're using the same domain for both
- ✅ Good: `https://myapp.com/quiz.html` → `https://myapp.com/api/submit`
- ❌ Bad: `file:///quiz.html` → `https://myapp.com/api/submit`

---

## 📱 Share With Your Team

### For Customers (Quiz Takers):
Share this link:
```
https://your-app-url.com/grubtech-onboarding-quiz.html
```

**Or create a QR code:**
1. Go to https://qr-code-generator.com
2. Enter your quiz URL
3. Download QR code
4. Print or share digitally

### For Admins (Dashboard Access):
Share this link:
```
https://your-app-url.com/admin.html
```

**⚠️ Important**: Add password protection in production! (See below)

---

## 🔐 Add Password Protection

**IMPORTANT**: Your admin dashboard is currently PUBLIC. Anyone with the URL can access it!

### Quick Fix: Add Basic Authentication

1. **Install package**
```bash
npm install express-basic-auth
```

2. **Edit server.js** (add after line 7):
```javascript
const basicAuth = require('express-basic-auth');

// Protect admin dashboard
app.use('/admin.html', basicAuth({
  users: {
    'admin': 'GrubTech2024!',  // Change this password!
    'manager': 'Manager2024!'   // Add more users if needed
  },
  challenge: true,
  realm: 'Grubtech Admin Dashboard'
}));
```

3. **Update package.json** (add to dependencies):
```json
"express-basic-auth": "^1.2.1"
```

4. **Commit and push**
```bash
git add .
git commit -m "Add admin password protection"
git push
```

5. **Access admin dashboard**
   - Username: `admin`
   - Password: `GrubTech2024!` (or whatever you set)

---

## 📊 Monitor Your Data

### Where is data stored?

**Railway/Render/Cyclic:**
- Data is in: `data/responses.json`
- Persists across restarts
- Automatically backed up

**Glitch:**
- Data resets every 5 minutes of inactivity
- Use Railway/Render for production!

### Backup Your Data

**Option 1: CSV Export (Easiest)**
1. Go to admin dashboard
2. Click "Export to CSV"
3. Save file to your computer
4. Do this weekly

**Option 2: Direct Download (Railway)**
1. Go to Railway dashboard
2. Click on your project
3. Click "..." → "Shell"
4. Run: `cat data/responses.json`
5. Copy and save

**Option 3: API Download**
```bash
curl https://your-app-url.com/api/responses > backup.json
```

---

## 🎯 Next Steps Checklist

- [ ] Deploy to Railway or Render
- [ ] Test quiz form (submit test response)
- [ ] Test admin dashboard (view responses)
- [ ] Add password protection to admin
- [ ] Share quiz URL with first customer
- [ ] Export first backup CSV
- [ ] Bookmark admin dashboard
- [ ] Delete test responses
- [ ] (Optional) Set up Microsoft Forms integration

---

## 💡 Pro Tips

1. **Bookmark admin dashboard** for daily checks
2. **Export CSV weekly** as backup
3. **Test with fake data** before going live
4. **Use QR codes** for easy access on mobile
5. **Monitor daily** for the first week
6. **Set calendar reminder** for weekly CSV backups
7. **Upgrade to paid plan** ($7/month) when you hit limits

---

## 📈 Upgrade Options

### When to Upgrade?

**Free Tier Limits:**
- Railway: 500 hours/month, 500MB storage
- Render: Spins down after 15 min, 512MB RAM
- Glitch: Not suitable for production

**Paid Plans ($7-10/month):**
- Always-on (no spin down)
- More storage
- Better performance
- Custom domain

### Database Upgrade

When you have 1000+ responses, consider upgrading to a real database:

**Option 1: MongoDB Atlas (Free tier)**
```bash
npm install mongoose
```

**Option 2: PostgreSQL on Railway**
- Add PostgreSQL in Railway dashboard
- Update code to use PostgreSQL

See README.md for database migration guide.

---

## Need Help?

### Resources:
- **Full Docs**: See [README.md](README.md)
- **API Reference**: Check README.md API section
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

### Troubleshooting:
1. Check browser console (F12)
2. Check server logs (Railway/Render dashboard)
3. Review this guide
4. Check GitHub issues

---

## 📞 Quick Reference

### Important URLs (after deployment):
```
Homepage:     https://your-app-url.com
Quiz Form:    https://your-app-url.com/grubtech-onboarding-quiz.html
Admin:        https://your-app-url.com/admin.html
API Endpoint: https://your-app-url.com/api/submit
```

### Important Files:
```
Quiz Form:    public/grubtech-onboarding-quiz.html
Admin Page:   public/admin.html
Backend:      server.js
Data Storage: data/responses.json
```

---

**You're all set! 🎉**

**Recommended:** Deploy to Railway (easiest) → Test → Add password → Share with customers!

Good luck collecting valuable feedback! 🚀
