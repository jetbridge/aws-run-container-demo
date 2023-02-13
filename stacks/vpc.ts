import { StackContext } from "sst/constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { IpAddresses } from "aws-cdk-lib/aws-ec2";

export function Vpc({ stack }: StackContext) {
  const vpc = new ec2.Vpc(stack, "Vpc", {
    natGateways: 1, // costs ~$15/month per gateway
    ipAddresses: IpAddresses.cidr("10.20.0.0/16"),
  });

  return { vpc };
}
