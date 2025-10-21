// AWS Lambda Function - Get Statistics

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

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
        // Get all responses
        const command = new ScanCommand({
            TableName: TABLE_NAME
        });

        const result = await docClient.send(command);
        const responses = result.Items;

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

        // Calculate statistics
        const totalScore = responses.reduce((sum, r) => sum + (r.totalScore || 0), 0);
        const totalPercentage = responses.reduce((sum, r) => sum + (r.percentage || 0), 0);
        const scores = responses.map(r => r.totalScore || 0);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                totalResponses: responses.length,
                averageScore: (totalScore / responses.length).toFixed(2),
                averagePercentage: (totalPercentage / responses.length).toFixed(2),
                highestScore: Math.max(...scores),
                lowestScore: Math.min(...scores)
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
