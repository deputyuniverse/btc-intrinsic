import { Cron, StackContext, use } from "@serverless-stack/resources";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";

export function CronStack({ stack }: StackContext) {

  const cron = new Cron(stack, "Cron", {
    schedule: "rate(1 minute)",
    job: "functions/dailyRun.main",
  });

  cron.attachPermissions(['dynamodb'])
}