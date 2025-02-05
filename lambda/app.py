from datetime import date, time
import json
import logging
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    TODAY = date.fromtimestamp(time.time())
    BASE_URL = "https://kf.kobotoolbox.org/api/v2/assets/"
    params = {
        'format': 'json'
    }
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
