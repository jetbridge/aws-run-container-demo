import { StackContext, use } from "sst/constructs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Vpc } from "./vpc";
import * as ecs from "aws-cdk-lib/aws-ecs";

export function Ecs({ stack }: StackContext) {
  const { vpc } = use(Vpc);

  new ApplicationLoadBalancedFargateService(stack, "Svc1", {
    vpc,
    memoryLimitMiB: 1024,
    cpu: 512,
    taskImageOptions: {
      image: ecs.ContainerImage.fromAsset("./packages/service1"),
      containerPort: 3000,
    },
  });
}
