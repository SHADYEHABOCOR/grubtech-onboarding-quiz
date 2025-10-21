// Netlify Serverless Function for CSV Export

const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const store = getStore('quiz-responses');

  try {
    const data = await store.get('responses', { type: 'json' }) || { responses: [] };
    const responses = data.responses;

    if (responses.length === 0) {
      return {
        statusCode: 404,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No responses to export' })
      };
    }

    // Generate CSV headers from first response
    const csvHeaders = Object.keys(responses[0]).join(',');

    // Generate CSV rows
    const csvRows = responses.map(response => {
      return Object.values(response).map(value => {
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    // Combine headers and rows
    const csv = [csvHeaders, ...csvRows].join('\n');

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="grubtech-quiz-responses-${Date.now()}.csv"`
      },
      body: csv
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
