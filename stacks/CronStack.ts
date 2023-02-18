import { Cron, StackContext, use } from "@serverless-stack/resources";

export function CronStack({ stack }: StackContext) {

  const cron = new Cron(stack, "Cron", {
    schedule: "cron(0 5 * * ? *)",
    job: "functions/lambda.main",
  });

  cron.attachPermissions(['dynamodb'])
}