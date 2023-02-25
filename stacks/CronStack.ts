import { Cron, StackContext, use } from "@serverless-stack/resources";

export function CronStack({ stack }: StackContext) {

  const cron = new Cron(stack, "Cron", {
    schedule: "rate(1 minute)",
    job: "functions/dailyRun.main",
  });

  cron.attachPermissions(['dynamodb'])
}