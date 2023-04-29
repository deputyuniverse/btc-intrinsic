import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { Cron, Function, StackContext, use } from "@serverless-stack/resources";

// export function CronStack({ stack }: StackContext) {

//   const cron = new Cron(stack, "Cron", {
//     schedule: "rate(1 minute)",
//     job: "functions/dailyRun.main",
//   });

//   cron.attachPermissions(['dynamodb'])
// }

export function CronStack({ stack }: StackContext) {

  const layerArn = "arn:aws:lambda:eu-west-1:764866452798:layer:chrome-aws-lambda:31"
  const layer = LayerVersion.fromLayerVersionArn(stack, "Layer", layerArn);

  const dailyRunFunction = new Function(stack, "Function", {
    handler: "functions/dailyRun.main",
    layers: [layer]
  })

  const cron = new Cron(stack, "Cron", {
    schedule: "rate(1 minute)",
    job: dailyRunFunction,
  });

  cron.attachPermissions(['dynamodb'])
}
