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

## 🌐 Deploy to Vercel (FREE - Recommended)

### Method 1: Using Vercel Website (Easiest)

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create a New Repository**
   - Click the "+" icon → "New repository"
   - Name it: `grubtech-quiz`
   - Make it Public
   - Click "Create repository"

3. **Upload Your Files**
   - Click "uploading an existing file"
   - Drag all files from this folder
   - Click "Commit changes"

4. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" and use "Continue with GitHub"
   - Click "Import Project"
   - Select your `grubtech-quiz` repository
   - Click "Import"
   - Vercel will auto-detect everything
   - Click "Deploy"
   - Wait 1-2 minutes... Done! 🎉

5. **Get Your URL**
   - Vercel will give you a URL like: `https://grubtech-quiz.vercel.app`
   - Share this URL with your team!

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow the prompts, and you're done!

---

## 🚂 Deploy to Render (FREE Alternative)

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository or use "Public Git Repository"

3. **Configure**
   - **Name**: `grubtech-quiz`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Your app is live!

---

## 📊 Access Your Admin Dashboard

After deployment, your URLs will be:
- Quiz Form: `https://your-app-url.com/grubtech-onboarding-quiz.html`
- Admin Dashboard: `https://your-app-url.com/admin.html`

**Save these URLs!** Share the quiz form with customers and keep the admin dashboard for yourself.

---

## 🔄 Microsoft Forms Integration

### Option A: Replace Microsoft Forms (Easiest)
Just use the provided quiz form instead. It's better looking and already connected!

### Option B: Keep Microsoft Forms + Connect to This Backend

1. **Get Your Deployment URL**
   - After deploying to Vercel/Render, copy your URL
   - Example: `https://grubtech-quiz.vercel.app`

2. **Set Up Power Automate** (Microsoft Flow)
   - Go to https://flow.microsoft.com
   - Click "Create" → "Automated cloud flow"
   - Trigger: "When a new response is submitted (Microsoft Forms)"
   - Action: "HTTP - HTTP"

3. **Configure HTTP Action**
   - **Method**: POST
   - **URI**: `https://your-app-url.com/api/submit`
   - **Headers**:
     ```
     Content-Type: application/json
     ```
   - **Body**: Map your form fields like this:
     ```json
     {
       "timestamp": @{utcNow()},
       "customerName": @{outputs('Get_response_details')?['body/responder']},
       "brandName": @{outputs('Get_response_details')?['body/r1234...']},
       "onboardingSpecialist": @{outputs('Get_response_details')?['body/r5678...']},
       "q1": @{outputs('Get_response_details')?['body/r9012...']},
       "totalScore": 25,
       "percentage": 83
     }
     ```

4. **Test It**
   - Submit a test response in Microsoft Forms
   - Check your admin dashboard
   - It should appear!

### Option C: Manual Import from CSV

If you have existing responses in Microsoft Forms:

1. **Export from Microsoft Forms**
   - Open your form
   - Click "Responses" tab
   - Click "Open in Excel"
   - Save as CSV

2. **Convert to JSON**
   - Use an online CSV to JSON converter
   - Or use Excel's Power Query

3. **Import to Backend**
   - Use the import script in README.md
   - Or manually POST each response to `/api/submit`

---

## ✅ Verify Everything Works

### Test Checklist:

- [ ] Submit a test quiz response
- [ ] Check admin dashboard - response appears
- [ ] Search for the response
- [ ] Click "View" to see details
- [ ] Export to CSV - file downloads
- [ ] Delete a test response
- [ ] Check stats update correctly

---

## 🆘 Common Issues

### "Cannot GET /"
**Solution**: Make sure you're accessing the right URL:
- ✅ `http://localhost:3000`
- ❌ `http://localhost:3000/server.js`

### "Failed to fetch" in browser
**Solution**: Server isn't running. Start it with `npm start`

### "Port 3000 already in use"
**Solution**:
```bash
# Kill the process on port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Admin dashboard is empty
**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Make sure you've submitted at least one response
4. Click the "Refresh" button

### CSV export not working
**Solution**: You need at least one response to export

---

## 📱 Share With Your Team

### For Customers (Quiz Takers):
Share this link:
```
https://your-app-url.com/grubtech-onboarding-quiz.html
```

### For Admins (Dashboard Access):
Share this link:
```
https://your-app-url.com/admin.html
```

**Note**: In production, you should add password protection to the admin dashboard!

---

## 🔐 Add Password Protection (Optional)

To protect your admin dashboard:

1. **Install basic-auth**
```bash
npm install express-basic-auth
```

2. **Add to server.js** (after the other requires):
```javascript
const basicAuth = require('express-basic-auth');

app.use('/admin.html', basicAuth({
  users: { 'admin': 'your-password-here' },
  challenge: true
}));
```

3. **Restart server**

Now accessing `/admin.html` requires:
- Username: `admin`
- Password: `your-password-here`

---

## 📊 Monitor Your Data

Your data is stored in the `data/responses.json` file.

**To backup your data:**
1. Download `data/responses.json` regularly
2. Or use the CSV export feature
3. Or upgrade to a real database (see README.md)

---

## 🎯 Next Steps

- [ ] Deploy to Vercel/Render
- [ ] Test the quiz form
- [ ] Test the admin dashboard
- [ ] Share quiz URL with customers
- [ ] Add password protection to admin
- [ ] Set up regular data backups
- [ ] (Optional) Upgrade to database

---

## 💡 Tips

1. **Bookmark your admin dashboard** for easy access
2. **Export to CSV regularly** as a backup
3. **Test with fake data first** before going live
4. **Share quiz URL** via email, QR code, or embed on website
5. **Check responses daily** to monitor customer feedback

---

## Need Help?

Check the full README.md file for:
- Complete API documentation
- Database upgrade guides
- Security best practices
- Troubleshooting guide

---

**You're all set! 🎉**

Deploy, share, and start collecting valuable customer feedback!
