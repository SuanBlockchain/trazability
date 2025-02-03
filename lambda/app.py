import json

def lambda_handler(event, context):
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
