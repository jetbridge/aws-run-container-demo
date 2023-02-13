import { SSTConfig } from "sst";
import { ApiGateway } from "./stacks/apiGateway";
import { Ecs } from "./stacks/ecs";
import { Vpc } from "./stacks/vpc";

export default {
  config(_input) {
    return {
      name: "runtainer",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiGateway).stack(Vpc).stack(Ecs);
  },
} satisfies SSTConfig;
