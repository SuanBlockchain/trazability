from datetime import date
import time
import json
import logging
import os
import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

import requests
from requests.structures import CaseInsensitiveDict

# Initialize SSM client
ssm = boto3.client("ssm", region_name="us-east-2")

def get_ssm_parameter(name, with_decryption=True):
    """Retrieve parameter from AWS SSM."""
    response = ssm.get_parameter(Name=name, WithDecryption=with_decryption)
    return response["Parameter"]["Value"]

def kobo_api(URL, params= {}):
    headers = CaseInsensitiveDict()
    kobo_token = get_ssm_parameter("/myapp/kobo_token")
    # logger.info(f"Kobo token: {kobo_token}")
    # kobo_token = os.getenv("kobo_token")
    headers["Authorization"] = "Token " + str(kobo_token)

    resp = requests.get(URL, headers=headers, params=params)
    rawResult = resp
    return rawResult

def lambda_handler(event, context):
    TODAY = date.fromtimestamp(time.time())
    BASE_URL = "https://kf.kobotoolbox.org/api/v2/assets/"
    params = {
        'format': 'json'
    }
    try:
        rawResult = kobo_api(BASE_URL, params)
        rawResult = json.loads(rawResult.content.decode('utf-8'))
        logging.info(f"Raw result: {rawResult}")
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
