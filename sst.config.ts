import { SSTConfig } from "sst";
import { ApiGateway } from "./stacks/apiGateway";
import { CICD } from "./stacks/cicd";
import { Ecs } from "./stacks/ecs";
import { Vpc } from "./stacks/vpc";

// mapping of stage to region
const STAGE_TO_REGION = {
  dev: "us-west-2",
  default: "us-west-2",
};

function isKnownStage(k: string): k is keyof typeof STAGE_TO_REGION {
  return k in STAGE_TO_REGION;
}

export default {
  config(_input) {
    const stage = _input.stage || "dev";
    const region = isKnownStage(stage)
      ? STAGE_TO_REGION[stage]
      : STAGE_TO_REGION["default"];

    return {
      name: "runtainer",
      region,
    };
  },

  stacks(app) {
    // deploy all of our stacks
    app.stack(ApiGateway).stack(Vpc).stack(Ecs).stack(CICD);
  },
} satisfies SSTConfig;
