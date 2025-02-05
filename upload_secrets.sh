#!/bin/bash

# Load .env file
export $(grep -v '^#' .env | xargs)

# Upload parameters to AWS SSM
aws ssm put-parameter --name "/myapp/db_host" --value "$DB_HOST" --type "SecureString" --overwrite
aws ssm put-parameter --name "/myapp/db_user" --value "$DB_USER" --type "SecureString" --overwrite
aws ssm put-parameter --name "/myapp/db_password" --value "$DB_PASSWORD" --type "SecureString" --overwrite
aws ssm put-parameter --name "/myapp/api_key" --value "$API_KEY" --type "SecureString" --overwrite

echo "✅ All parameters uploaded to SSM!"
