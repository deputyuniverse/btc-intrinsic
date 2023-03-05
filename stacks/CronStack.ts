import { Cron, StackContext, use } from "@serverless-stack/resources";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";

export function CronStack({ stack }: StackContext) {

  stack.addDefaultFunctionLayers([LayerVersion.fromLayerVersionArn(stack, "ChromeLayer", "arn:aws:lambda:us-east-1:764866452798:layer:chrome-aws-lambda:22")])

  const cron = new Cron(stack, "Cron", {
    schedule: "rate(1 minute)",
    job: "functions/dailyRun.main",
  });

  cron.attachPermissions(['dynamodb'])
}