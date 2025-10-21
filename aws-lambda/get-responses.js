// AWS Lambda Function - Get All Responses or Single Response

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'grubtech-quiz-responses';

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Check if requesting a single response by ID
        const responseId = event.pathParameters?.id;

        if (responseId) {
            // Get single response
            const command = new GetCommand({
                TableName: TABLE_NAME,
                Key: { id: responseId }
            });

            const result = await docClient.send(command);

            if (result.Item) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        response: result.Item
                    })
                };
            } else {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Response not found' })
                };
            }
        } else {
            // Get all responses
            const command = new ScanCommand({
                TableName: TABLE_NAME
            });

            const result = await docClient.send(command);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    count: result.Items.length,
                    responses: result.Items
                })
            };
        }

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
