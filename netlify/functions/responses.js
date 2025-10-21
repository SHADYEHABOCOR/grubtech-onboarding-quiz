// Netlify Serverless Function to Get/Delete Responses

const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const store = getStore('quiz-responses');

  try {
    // Get all responses
    if (event.httpMethod === 'GET') {
      // Check if requesting single response
      const pathParts = event.path.split('/');
      const responseId = pathParts[pathParts.length - 1];

      const data = await store.get('responses', { type: 'json' }) || { responses: [] };

      // Single response
      if (responseId && responseId !== 'responses') {
        const response = data.responses.find(r => r.id === responseId);
        if (response) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, response })
          };
        } else {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Response not found' })
          };
        }
      }

      // All responses
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          count: data.responses.length,
          responses: data.responses
        })
      };
    }

    // Delete response
    if (event.httpMethod === 'DELETE') {
      const pathParts = event.path.split('/');
      const responseId = pathParts[pathParts.length - 1];

      const data = await store.get('responses', { type: 'json' }) || { responses: [] };
      const filteredResponses = data.responses.filter(r => r.id !== responseId);

      if (filteredResponses.length < data.responses.length) {
        await store.set('responses', JSON.stringify({ responses: filteredResponses }));
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: 'Response deleted successfully' })
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Response not found' })
        };
      }
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
