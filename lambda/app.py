import json
import logging
import boto3
import uuid

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize S3 client
s3 = boto3.client('s3')

# Initialize SSM client
ssm = boto3.client("ssm", region_name="us-east-2")


def lambda_handler(event, context):
    try:
        logging.info(f"Received event: {event}")
        logging.info(f"Received context: {context}")
        logging.info(f"Event: {event.get('body', {})}")
        body = json.loads(event.get("body", "{}"))

        # Generate a unique key for the S3 object
        s3_key = f"data/{uuid.uuid4()}.json"

        # Upload the data to S3
        s3.put_object(
            Bucket='your-s3-bucket-name',
            Key=s3_key,
            Body=json.dumps(body),
            ContentType='application/json'
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Database populated!", "received_data": body, "s3_key": s3_key})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
