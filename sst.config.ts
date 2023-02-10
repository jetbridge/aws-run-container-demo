import { SSTConfig } from "sst";
import { ApiGateway } from "./stacks/apiGateway";

export default {
  config(_input) {
    return {
      name: "runtainer",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiGateway);
  },
} satisfies SSTConfig;
