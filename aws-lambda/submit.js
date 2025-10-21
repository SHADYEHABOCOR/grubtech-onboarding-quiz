// AWS Lambda Function - Submit Quiz Response
// Uses DynamoDB for persistent storage

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'grubtech-quiz-responses';

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const response = JSON.parse(event.body);

        // Validate required fields
        if (!response.timestamp) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Timestamp is required' })
            };
        }

        // Generate unique ID
        const id = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        response.id = id;

        // Add created timestamp
        response.createdAt = new Date().toISOString();

        // Save to DynamoDB
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: response
        });

        await docClient.send(command);

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Response submitted successfully',
                id: id
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
