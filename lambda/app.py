import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    logger.info(f"Received event: {event}")
    try:
        body = json.loads(event.get("body", "{}"))

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Database populated!", "received_data": body})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
