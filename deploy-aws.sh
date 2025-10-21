#!/bin/bash

# Grubtech Quiz - AWS Deployment Script
# This script automates the deployment to AWS using SAM CLI

echo "🚀 Grubtech Quiz - AWS Deployment"
echo "=================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not installed"
    echo "Install: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI not installed"
    echo "Install: brew install aws-sam-cli"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Install Lambda dependencies
echo "📦 Installing Lambda function dependencies..."
cd aws-lambda
npm install
cd ..

echo "✅ Dependencies installed"
echo ""

# Build the application
echo "🔨 Building SAM application..."
sam build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy
echo "🚀 Deploying to AWS..."
echo "This will:"
echo "  - Create DynamoDB table"
echo "  - Deploy 5 Lambda functions"
echo "  - Create API Gateway"
echo "  - Configure CORS"
echo ""

# Check if samconfig.toml exists
if [ -f "samconfig.toml" ]; then
    echo "Found existing configuration, deploying..."
    sam deploy
else
    echo "First time deployment, running guided setup..."
    sam deploy --guided
fi

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the API URL from the CloudFormation Outputs above"
echo "2. Update your frontend files with this URL"
echo "3. Deploy frontend to S3 or Netlify"
echo ""
echo "🎉 Your backend is now live on AWS!"
