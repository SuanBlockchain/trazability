# Lambda

> This Lambda function is triggered every time a new record is created in KoboToolbox. Based on the ID of the record, the API is called to fetch all the data specific to that record. It formats and places the data and files in an S3 bucket in JSON format.

***

The Lambda function is deployed every time a new commit is made to GitHub using the workflow feature [lambda-deploy.yml](../.github/workflows/lambda-deploy.yml).

## Testing the Lambda function locally

If local tests are needed, you need to configure the following:

### Installing the AWS CLI

1. Download the AWS CLI installer:

```shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

2. Unzip the installer:

```shell
unzip awscliv2.zip
```

3. Run the installer:
```shel
sudo ./aws/install
```

4. Verify the installation:
```shell
aws --version
```

### Installing the SAM CLI
1. Download the SAM CLI installer:
```shell
curl -Lo sam-installation https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
```

2. Unzip the installer:
```shell
unzip sam-installation -d sam-installation-dir
```

3. Run the installer:
```shell
sudo ./sam-installation-dir/install
```

4. Verify the installation:
```shell
sam --version
```

### Configure virtual environment
Since the lambda is using requests, we need to configure an virtual environment

```shell
cd lambda
python3 -m venv .venv
source .venv/bin/activate
pip install requests boto3
```

### Run SAM locally
Run SAM Build and SAM local invoke to test the lambda

```shell
sam build --use-container
sam local invoke DatabaseLambdaFunction
```

### Upload secrets

Secrets are uploaded using the upload_secrets.sh script. The script reads the .env file with the secrets and creates secret variables (e.g., kobo_token) using AWS SSM. These secrets are later used in the Lambda function to connect to the API. ```