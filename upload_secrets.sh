#!/bin/bash

# Load .env file
export $(grep -v '^#' .env | xargs)

# Upload parameters to AWS SSM
aws ssm put-parameter --name "/myapp/kobo_token" --value "$KOBO_TOKEN" --type "SecureString" --overwrite

echo "✅ All parameters uploaded to SSM!"
