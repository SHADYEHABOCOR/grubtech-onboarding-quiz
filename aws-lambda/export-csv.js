// AWS Lambda Function - Export to CSV

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'grubtech-quiz-responses';

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
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
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
