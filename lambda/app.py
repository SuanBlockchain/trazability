import os
import json

def lambda_handler(event, context):
    # database_url = os.getenv("DATABASE_URL")
    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Database populated!", "db_url": "database_url"}) # change to database_url
    }
