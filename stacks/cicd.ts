import {
  OpenIdConnectProvider,
  Role,
  ManagedPolicy,
  OpenIdConnectPrincipal,
} from "aws-cdk-lib/aws-iam";
import { StackContext } from "sst/constructs";

export function CICD({ stack }: StackContext) {
  // permissions for GitHub Actions to authenticate with AWS
  // using OICD
  // https://github.com/aws-actions/configure-aws-credentials

  // only create this in prod and dev
  if (!["prod", "dev"].includes(stack.stage)) return;

  const GITHUB_ORG = process.env.GITHUB_ORG;
  if (!GITHUB_ORG) {
    throw new Error(
      "Please configure your GITHUB_ORG environment variable in .env"
    );
  }

  // add the GitHub Actions OIDC provider
  const provider = new OpenIdConnectProvider(stack, "provider", {
    url: "https://token.actions.githubusercontent.com",
    thumbprints: ["6938fd4d98bab03faadb97b34396831e3780aea1"],
    clientIds: ["sts.amazonaws.com"],
  });

  // create a role that can be assumed by GitHub Actions
  const role = new Role(stack, "role", {
    roleName: "github",
    managedPolicies: [
      ManagedPolicy.fromManagedPolicyArn(
        stack,
        "policy",
        "arn:aws:iam::aws:policy/AdministratorAccess"
      ),
    ],
    assumedBy: new OpenIdConnectPrincipal(provider, {
      StringLike: {
        "token.actions.githubusercontent.com:sub": `repo:${GITHUB_ORG}/*`,
      },
    }),
  });

  stack.addOutputs({
    ROLE: role.roleArn,
  });
}
