import { Cron, StackContext } from "@serverless-stack/resources";

export function CronStack({ stack }: StackContext) {
  new Cron(stack, "Cron", {
    schedule: "rate(1 minute)",
    job: "functions/lambda.main",
  });
}