import { StackContext, use } from "sst/constructs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Vpc } from "./vpc";
import * as ecs from "aws-cdk-lib/aws-ecs";

export function Ecs({ stack }: StackContext) {
  const { vpc } = use(Vpc);

  // run container on ECS Fargate
  const svc1 = new ApplicationLoadBalancedFargateService(stack, "Svc1", {
    vpc,
    memoryLimitMiB: 1024,
    cpu: 512,
    taskImageOptions: {
      image: ecs.ContainerImage.fromAsset("."),
      containerName: "service1",
      containerPort: 3000,
    },
  });

  // health check
  svc1.targetGroup.configureHealthCheck({
    path: "/",
  });
}
