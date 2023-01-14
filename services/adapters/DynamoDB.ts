import { DynamoDB } from 'aws-sdk';

export class DynamoDBAdapter {
    private dynamo: DynamoDB;
    private tableName: string;

    constructor(tableName: string) {
        this.dynamo = new DynamoDB();
        this.tableName = tableName;
    }

    async get(partitionKey: string, date: string): Promise<any> {
        try {
            const params = {
                TableName: this.tableName,
                Key: {
                    partitionKey: { S: partitionKey },
                    sortKey: { S: date }
                }
            };
            const data = await this.dynamo.getItem(params).promise();
            if(!data.Item){
              const queryParams = {
                TableName: this.tableName,
                KeyConditionExpression: "partitionKey = :pk",
                ExpressionAttributeValues: {
                    ":pk": { S: partitionKey }
                },
                ScanIndexForward: false,
                Limit: 1
              };
              const queryResults = await this.dynamo.query(queryParams).promise();
              if(queryResults.Items && queryResults.Items.length > 0){
                return queryResults.Items[0];
              }
            }
            return data.Item;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    
    async put(partitionKey: string, sortKey: string, field: string, value: any): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                partitionKey: { S: partitionKey },
                sortKey: { S: sortKey },
                [field]: { S: value }
            }
        };
    
        try {
            await this.dynamo.putItem(params).promise();
        } catch (err) {
            console.error(err);
        }
    }
}

