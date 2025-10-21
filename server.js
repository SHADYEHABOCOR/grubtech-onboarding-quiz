const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'responses.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data directory exists
async function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }

    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
}

// Read responses from file
async function readResponses() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading responses:', error);
        return [];
    }
}

// Write responses to file
async function writeResponses(responses) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(responses, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing responses:', error);
        return false;
    }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Grubtech Quiz API is running' });
});

// Submit a quiz response
app.post('/api/submit', async (req, res) => {
    try {
        const response = req.body;

        // Validate required fields
        if (!response.timestamp) {
            return res.status(400).json({ error: 'Timestamp is required' });
        }

        // Add a unique ID
        response.id = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Read existing responses
        const responses = await readResponses();

        // Add new response
        responses.push(response);

        // Save to file
        const saved = await writeResponses(responses);

        if (saved) {
            res.status(201).json({
                success: true,
                message: 'Response submitted successfully',
                id: response.id
            });
        } else {
            res.status(500).json({ error: 'Failed to save response' });
        }
    } catch (error) {
        console.error('Error submitting response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all responses (for admin)
app.get('/api/responses', async (req, res) => {
    try {
        const responses = await readResponses();
        res.json({
            success: true,
            count: responses.length,
            responses: responses
        });
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single response by ID
app.get('/api/responses/:id', async (req, res) => {
    try {
        const responses = await readResponses();
        const response = responses.find(r => r.id === req.params.id);

        if (response) {
            res.json({ success: true, response });
        } else {
            res.status(404).json({ error: 'Response not found' });
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a response (admin)
app.delete('/api/responses/:id', async (req, res) => {
    try {
        const responses = await readResponses();
        const filteredResponses = responses.filter(r => r.id !== req.params.id);

        if (filteredResponses.length < responses.length) {
            await writeResponses(filteredResponses);
            res.json({ success: true, message: 'Response deleted successfully' });
        } else {
            res.status(404).json({ error: 'Response not found' });
        }
    } catch (error) {
        console.error('Error deleting response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get CSV export
app.get('/api/export/csv', async (req, res) => {
    try {
        const responses = await readResponses();

        if (responses.length === 0) {
            return res.status(404).json({ error: 'No responses to export' });
        }

        // Generate CSV headers from first response
        const headers = Object.keys(responses[0]).join(',');

        // Generate CSV rows
        const rows = responses.map(response => {
            return Object.values(response).map(value => {
                // Escape commas and quotes in values
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        });

        // Combine headers and rows
        const csv = [headers, ...rows].join('\n');

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="grubtech-quiz-responses-${Date.now()}.csv"`);
        res.send(csv);
    } catch (error) {
        console.error('Error exporting CSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const responses = await readResponses();

        if (responses.length === 0) {
            return res.json({
                totalResponses: 0,
                averageScore: 0,
                averagePercentage: 0
            });
        }

        const totalScore = responses.reduce((sum, r) => sum + (r.totalScore || 0), 0);
        const totalPercentage = responses.reduce((sum, r) => sum + (r.percentage || 0), 0);

        res.json({
            totalResponses: responses.length,
            averageScore: (totalScore / responses.length).toFixed(2),
            averagePercentage: (totalPercentage / responses.length).toFixed(2),
            highestScore: Math.max(...responses.map(r => r.totalScore || 0)),
            lowestScore: Math.min(...responses.map(r => r.totalScore || 0))
        });
    } catch (error) {
        console.error('Error calculating stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Initialize and start server
async function startServer() {
    await ensureDataDirectory();

    app.listen(PORT, () => {
        console.log(`🚀 Grubtech Quiz API running on port ${PORT}`);
        console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin.html`);
        console.log(`📝 Quiz form: http://localhost:${PORT}/grubtech-onboarding-quiz.html`);
    });
}

startServer();
