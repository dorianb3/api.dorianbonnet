---
title: Deploying Your React Application to S3 with GitHub Actions
date: February 3, 2023
author: Dorian Bonnet
abstract: In this tutorial, we will walk through the process of automating the deployment of your React application to an S3 bucket using GitHub Actions. By leveraging the power of continuous integration and deployment, you can streamline the deployment process and ensure that your application is always up-to-date.
keywords: AWS, S3, React, Github Action, Yaml
topic: Web Development
status: ok
---

Prerequisites:
Before getting started, make sure you have the following prerequisites in place:

- A React application set up and ready for deployment.
- An AWS account with access to S3.

### Step 1: Setting up GitHub Actions

Create a new file named .github/workflows/deploy.yml in the root directory of your project.
Copy and paste the following YAML code into deploy.yml:

TEST UPDATE HERE !!!!!

```yml
name: Build and Deploy
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Checkout code
      - name: Checkout code
        uses: actions/checkout@v2

      # Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      # Install dependencies
      - name: Install dependencies
        run: npm install

      # Build application
      - name: Build application
        run: npm run build

      # Configure AWS Credentials
      - name: Configure AWS Credentials
        id: aws-credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-3

      # Deploy static site to S3 bucket
      - name: Deploy static site to S3 bucket
        run: aws s3 sync ./build s3://your-bucket-name --acl public-read --delete --exclude '/*' --include '*/*'

      # Create CloudFront invalidation
      - name: Create CloudFront invalidation
        run: |
          aws cloudfront create-invalidation \
            --distribution-id YOUR_DISTRIBUTION_ID \
            --paths "/*"

      # Set AWS credentials as environment variables
      - name: Set AWS credentials as environment variables
        run: |
          echo "AWS_ACCESS_KEY_ID=${{ steps.aws-credentials.outputs.access-key-id }}" >> $GITHUB_ENV
          echo "AWS_SECRET_ACCESS_KEY=${{ steps.aws-credentials.outputs.secret-access-key }}" >> $GITHUB_ENV
          echo "AWS_REGION=${{ steps.aws-credentials.outputs.region }}" >> $GITHUB_ENV
```

### Step 2: Configure AWS Credentials

1. Open your AWS Management Console and navigate to the IAM service.
2. Create a new IAM user or use an existing one.
3. Assign the required permissions for S3 access to the IAM user.
4. Generate and note down the access key ID and secret access key for the IAM user.

### Step 3: Configure GitHub Secrets

1. Go to your GitHub repository and navigate to "Settings" -> "Secrets".
2. Click on "New repository secret" and add the following secrets:

- Name: AWS_ACCESS_KEY_ID, Value: <your-access-key-id>
- Name: AWS_SECRET_ACCESS_KEY, Value: <your-secret-access-key>

### Step 4: Update GitHub Actions Workflow

1. Replace your-bucket-name with the name of your S3 bucket in the deploy.yml file.
2. Replace YOUR_DISTRIBUTION_ID with the ID of your CloudFront distribution in the deploy.yml file.

### Step 5: Commit and Push Changes

1. Save the deploy.yml file and commit the changes to your repository.
2. Push the changes to the main branch.

Conclusion:

In this tutorial, we learned how to deploy a React application to an S3 bucket using GitHub Actions. By automating the deployment process, you can save time and effort while ensuring that your application is always up-to-date. With the power of continuous integration and deployment, you can focus on building great applications without worrying about manual deployments.

Remember to review your AWS credentials and GitHub secrets to ensure the security of your deployment process.

That's it! You can now enjoy the benefits of automated deployments with GitHub Actions and S3. Happy coding and deploying!
