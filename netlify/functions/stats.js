// Netlify Serverless Function for Statistics

const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
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
        statusCode: 200,
        headers,
        body: JSON.stringify({
          totalResponses: 0,
          averageScore: 0,
          averagePercentage: 0,
          highestScore: 0,
          lowestScore: 0
        })
      };
    }

    const totalScore = responses.reduce((sum, r) => sum + (r.totalScore || 0), 0);
    const totalPercentage = responses.reduce((sum, r) => sum + (r.percentage || 0), 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        totalResponses: responses.length,
        averageScore: (totalScore / responses.length).toFixed(2),
        averagePercentage: (totalPercentage / responses.length).toFixed(2),
        highestScore: Math.max(...responses.map(r => r.totalScore || 0)),
        lowestScore: Math.min(...responses.map(r => r.totalScore || 0))
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
