# AWS Runtainer

## What is this?

An example of deploying AWS-native services with CDK and GitHub Actions.

## What does this example do?

### Creates

- VPC
- API Gateway
- Lambda function triggered by API gateway
- Load-balanced containerized application running on Fargate

### Features

Uses CDK to describe our infrastructure as code.

Builds a docker image that is deployed to Fargate behind an ALB.

Demonstrates how to use [GitHub actions with OIDC authentication](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role) as
recommended by AWS for a CI/CD pipeline.

Uses [Serverless Stack](https://sst.dev/) to provide [live local lambda development](https://docs.sst.dev/live-lambda-development).

Shared typescript library in `packages/core`.

## Instructions

### Install prerequisites

Node 18 is recommended.

```shell
npm i -g pnpm
pnpm i
```

### Provide AWS credentials

Follow [these instructions](https://docs.sst.dev/advanced/iam-credentials).

### Configure CI/CD pipeline

To configure CI/CD you will need to create a role for GitHub Actions to authenticate as.

1. Edit `.env` and set your GitHub org
1. Deploy to your dev environment: `pnpm deploy:dev`
1. Copy the value of the `CICD ROLE:` stack output ARN to `.github/workflows/deploy.yml` under `DEV_AWS_ROLE` - this will let your GitHub action authenticate with OIDC to AWS.

Push to `master` to deploy to the `dev` environment, push to the `prod` branch to deploy to production.

#### Alternative

[Seed](https://seed.run) is a great tool for deploying CDK and SST apps to AWS.

## Files

You will want to edit these files for your setup:

- `sst.config.ts` - can configure default regions, AWS profiles, stacks to deploy, app name
- `.env` - configure your GitHub org for GitHub action authentication
- `stacks/` - infrastructure lives in here
