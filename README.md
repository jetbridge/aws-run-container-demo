# AWS Runtainer

## What is this?

An example of deploying AWS-native services.

## What does this example do?

### Creates

- VPC
- API Gateway
- Lambda function triggered by API gateway
- Load-balanced containerized application running on Fargate

### Features

Uses CDK to describe our infrastructure as code.

Uses [Serverless Stack](https://sst.dev/) to provide [live local lambda development](https://docs.sst.dev/live-lambda-development).

Demonstrates how to use [GitHub actions with OIDC authentication](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role) as
recommended by AWS for a CI/CD pipeline.

## Instructions

### Install prerequisites

```shell
npm i -g pnpm
pnpm i
```

### Provide AWS credentials

Follow [these instructions](https://docs.sst.dev/advanced/iam-credentials).

### Configure CI/CD pipeline

To configure CI/CD you will need to create a role for GitHub Actions to authenticate as.

1. Deploy to your dev environment: `pnpm deploy:dev`
1.
