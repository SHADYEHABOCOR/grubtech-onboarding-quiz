// AWS Lambda Function - Delete Response

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'grubtech-quiz-responses';

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const responseId = event.pathParameters?.id;

        if (!responseId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Response ID is required' })
            };
        }

        // Check if exists first
        const getCommand = new GetCommand({
            TableName: TABLE_NAME,
            Key: { id: responseId }
        });

        const existing = await docClient.send(getCommand);

        if (!existing.Item) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Response not found' })
            };
        }

        // Delete the response
        const deleteCommand = new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { id: responseId }
        });

        await docClient.send(deleteCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Response deleted successfully'
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
