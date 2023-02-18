import { DynamoDB } from 'aws-sdk';

export class DynamoDBAdapter {
    private dynamo: DynamoDB;
    private tableName: string;

    constructor(tableName: string) {
        this.dynamo = new DynamoDB();
        this.tableName = tableName;
    }

    async get(country: string, date: string, numericColumnName: string): Promise<any> {
        try {
            const params = {
                TableName: this.tableName,
                Key: {
                    country: { S: country },
                    date: { S: date }
                }
            };
            const data = await this.dynamo.getItem(params).promise();
            if(!data.Item){
              const queryParams = {
                TableName: this.tableName,
                KeyConditionExpression: "country = :pk",
                ExpressionAttributeValues: {
                    ":pk": { S: country }
                },
                ScanIndexForward: false,
                Limit: 1
              };
              const queryResults = await this.dynamo.query(queryParams).promise();
              if(queryResults.Items && queryResults.Items.length > 0){
                return queryResults.Items[0][numericColumnName].N;
              }
            }
            else {
                await data.Item[numericColumnName].N;
            }
            
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    
    async put(country: string, date: string, field: string, value: any): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                country: { S: country },
                date: { S: date },
                [field]: { N: `${value}`}
            }
        };
        try {
            await this.dynamo.putItem(params).promise();
        } catch (err) {
            console.error(err);
        }
    }
}

