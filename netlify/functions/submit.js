// Netlify Serverless Function for Quiz Submission
// Uses Netlify's built-in blob storage

const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const store = getStore('quiz-responses');

  try {
    if (event.httpMethod === 'POST') {
      // Submit new response
      const response = JSON.parse(event.body);

      if (!response.timestamp) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Timestamp is required' })
        };
      }

      // Generate unique ID
      response.id = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Get existing responses
      const existingData = await store.get('responses', { type: 'json' }) || { responses: [] };

      // Add new response
      existingData.responses.push(response);

      // Save back to blob store
      await store.set('responses', JSON.stringify(existingData));

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Response submitted successfully',
          id: response.id
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
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
