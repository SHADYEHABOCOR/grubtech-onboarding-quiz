# Grubtech Onboarding CSAT Quiz - Backend & Admin Dashboard

A complete solution for collecting, storing, and managing customer satisfaction survey responses with a powerful admin dashboard.

## Features

- **Frontend Quiz Form**: Professional, mobile-responsive survey form
- **Backend API**: Express.js server with RESTful endpoints
- **Admin Dashboard**: View, search, filter, and manage all responses
- **CSV Export**: Download all responses in CSV format
- **Data Persistence**: JSON file storage (easily upgradeable to database)
- **Real-time Stats**: Average scores, response counts, and more

## Quick Start

### Local Development

1. **Install Dependencies**
```bash
npm install
```

2. **Start the Server**
```bash
npm start
```

3. **Access the Application**
- Homepage: http://localhost:3000
- Quiz Form: http://localhost:3000/grubtech-onboarding-quiz.html
- Admin Dashboard: http://localhost:3000/admin.html

### Development Mode (Auto-reload)
```bash
npm run dev
```

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts**
- Select your project
- Configure as needed
- Deploy!

**Alternative: Deploy via Vercel Website**
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Import Project"
4. Connect your GitHub repository or upload this folder
5. Vercel will auto-detect the configuration
6. Click "Deploy"

### Option 2: Deploy to Render

1. Go to https://render.com
2. Sign up/login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository or use "Public Git Repository"
5. Configure:
   - **Name**: grubtech-quiz
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click "Create Web Service"

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Sign up/login
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Click "Deploy"

### Option 4: Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Create Heroku App**
```bash
heroku create grubtech-quiz
```

3. **Deploy**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

## API Endpoints

### Public Endpoints

#### Submit Quiz Response
```
POST /api/submit
Content-Type: application/json

{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "customerName": "John Doe",
  "brandName": "Restaurant ABC",
  "onboardingSpecialist": "Jane Smith",
  "calledBy": "Dina Abdelaziz",
  "posName": "Square POS",
  "q1": "5",
  "q1_text": "Very satisfied",
  "q2": "5",
  "q3": "5",
  "q3_text": "Yes",
  "q4": "5",
  "q4_text": "Yes",
  "q5": "5",
  "q5_text": "Yes",
  "q6": "Great experience overall!",
  "totalScore": 30,
  "percentage": 100
}
```

### Admin Endpoints

#### Get All Responses
```
GET /api/responses
```

#### Get Statistics
```
GET /api/stats
```

#### Get Single Response
```
GET /api/responses/:id
```

#### Delete Response
```
DELETE /api/responses/:id
```

#### Export to CSV
```
GET /api/export/csv
```

## Admin Dashboard Features

### View All Responses
- Sortable table with all submissions
- Color-coded score badges
- Responsive design for mobile/tablet

### Search & Filter
- Search by customer name, brand, specialist, or POS
- Real-time filtering

### Statistics Dashboard
- Total responses count
- Average score (out of 30)
- Average percentage
- Highest score

### Response Details
- Click "View" to see full response details
- All customer information
- Complete survey answers
- Formatted and easy to read

### Export Data
- Download all responses as CSV
- Timestamp-based filenames
- Properly formatted for Excel/Google Sheets

### Delete Responses
- Delete individual responses
- Bulk delete with "Clear All Data"
- Confirmation dialogs for safety

## Integration with Microsoft Forms

Since you mentioned Microsoft Forms, here are the integration options:

### Option 1: Replace Microsoft Forms Entirely
Use the provided `grubtech-onboarding-quiz.html` form instead of Microsoft Forms. It already submits to this backend automatically.

### Option 2: Use Microsoft Forms + Power Automate
1. Keep using Microsoft Forms
2. Set up Power Automate flow to send responses to this API
3. Create a flow that triggers on "When a new response is submitted"
4. Add HTTP action to POST to `/api/submit` endpoint

**Power Automate HTTP Action Setup:**
- Method: POST
- URI: `https://your-deployed-url.com/api/submit`
- Headers: `Content-Type: application/json`
- Body: Map Microsoft Forms fields to JSON structure

### Option 3: Manual Data Import
1. Export responses from Microsoft Forms as CSV
2. Convert CSV to JSON format
3. Use a script to POST each response to `/api/submit`

**Example import script (save as `import.js`):**
```javascript
const fs = require('fs');
const fetch = require('node-fetch');

async function importResponses() {
  const responses = JSON.parse(fs.readFileSync('responses.json'));

  for (const response of responses) {
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response)
    });
  }
}

importResponses();
```

## File Structure

```
Review Form/
├── server.js                  # Express backend server
├── package.json              # Dependencies and scripts
├── vercel.json              # Vercel deployment config
├── .gitignore               # Git ignore file
├── README.md                # This file
├── data/                    # Data storage (auto-created)
│   └── responses.json       # All quiz responses
└── public/                  # Static files
    ├── index.html           # Landing page
    ├── admin.html           # Admin dashboard
    └── grubtech-onboarding-quiz.html  # Quiz form
```

## Data Storage

Responses are stored in `data/responses.json`. Each response has:
- Unique ID
- Timestamp
- Customer information (name, brand, specialist, etc.)
- All quiz answers
- Total score and percentage

**Example response object:**
```json
{
  "id": "quiz_1234567890_abc123",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "customerName": "John Doe",
  "brandName": "Restaurant ABC",
  "onboardingSpecialist": "Jane Smith",
  "calledBy": "Dina Abdelaziz",
  "posName": "Square POS",
  "q1": "5",
  "q1_text": "Very satisfied",
  "q2": "5",
  "q3": "5",
  "q3_text": "Yes",
  "q4": "5",
  "q4_text": "Yes",
  "q5": "5",
  "q5_text": "Yes",
  "q6": "Great experience!",
  "totalScore": 30,
  "percentage": 100
}
```

## Upgrading to a Database

To upgrade from JSON file storage to a real database:

### MongoDB
```javascript
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  timestamp: Date,
  customerName: String,
  brandName: String,
  // ... other fields
});

const Response = mongoose.model('Response', responseSchema);
```

### Firebase
```javascript
const admin = require('firebase-admin');
const db = admin.firestore();

// Save response
await db.collection('responses').add(response);

// Get all responses
const snapshot = await db.collection('responses').get();
```

### PostgreSQL (with Sequelize)
```javascript
const { Sequelize, DataTypes } = require('sequelize');

const Response = sequelize.define('Response', {
  timestamp: DataTypes.DATE,
  customerName: DataTypes.STRING,
  // ... other fields
});
```

## Security Considerations

**For Production Use:**

1. **Add Authentication to Admin Dashboard**
```javascript
app.use('/admin.html', (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === 'Bearer YOUR_SECRET_TOKEN') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});
```

2. **Add CORS Restrictions**
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

3. **Add Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

4. **Environment Variables**
Create a `.env` file:
```
PORT=3000
NODE_ENV=production
API_SECRET=your_secret_key
```

## Troubleshooting

### Responses not saving
- Check if `data` folder exists
- Check file permissions
- Check server console for errors

### Admin dashboard not loading responses
- Open browser console (F12)
- Check for API errors
- Verify server is running

### CSV export not working
- Ensure responses exist in database
- Check browser downloads folder
- Check server console for errors

### CORS errors
- Verify CORS is enabled in server.js
- Check if frontend and backend URLs match

## Support

For issues or questions:
1. Check the browser console (F12)
2. Check the server logs
3. Review the API endpoints section
4. Check that data folder has write permissions

## License

MIT

---

**Built with:** Node.js, Express, Vanilla JavaScript, HTML5, CSS3

**Author:** Grubtech Development Team

**Version:** 1.0.0
