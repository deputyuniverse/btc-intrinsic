import { Table, StackContext } from "@serverless-stack/resources";

export function DatabaseStack({ stack }: StackContext) {
    new Table(stack, "CDS", {
    fields: {
        country: "string",
        date: "string",
        cds_5y_price: "number",
        insurance_value: "number"
    },
    primaryIndex: { partitionKey: "country", sortKey: "date" },
    });

    new Table(stack, "Debt", {
    fields: {
        country: "string",
        date: "string",
        value: "number"
    },
    primaryIndex: { partitionKey: "country", sortKey: "date" },
    });
}