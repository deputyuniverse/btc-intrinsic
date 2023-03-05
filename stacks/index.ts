import { CronStack } from "./CronStack";
import { DatabaseStack } from "./DatabaseStack";
import { App } from "@serverless-stack/resources";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.addDefaultFunctionLayers([LayerVersion.fromLayerVersionArn(app, "ChromeLayer", "arn:aws:lambda:us-east-1:764866452798:layer:chrome-aws-lambda:22")])
  if (app.stage === "dev") {
    app.setDefaultRemovalPolicy("destroy");
  }
  app.stack(DatabaseStack).stack(CronStack);
}
