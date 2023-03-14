import { DynamoDBAdapter} from "../adapters/DynamoDB";

export async function getCDS5y(country: string) {
    const { investing } = require('investing-com-api');
    try {
        const response = await investing(`rates-bonds/usa-5-year-cds`, 'P1D', 'P1D');
        const cds_5y_price = response[0].value;
        return cds_5y_price
    } catch (err) {
        console.error(err);
    }
}

export async function getCountryInsuranceValue(totalDebt: number, cds5yPrice: number): Promise<number> {
    const adjustedCDS = (cds5yPrice * 4) / 10000
    return adjustedCDS * totalDebt;
}

export async function runCountryForDay(country: string, date: string) {
    try {
      // define adapter
      const environment = process.env.SST_STAGE
      const cdsAdapter = new DynamoDBAdapter(`${environment}-btc-intrinsic-CDS`);
      const debtAdapter = new DynamoDBAdapter(`${environment}-btc-intrinsic-Debt`);
      const insuranceAdapter = new DynamoDBAdapter(`${environment}-btc-intrinsic-Insurance`)
  
      // save cds5yPrice
      const cds5yPrice = await getCDS5y(country);
      cdsAdapter.put(country, date, "cds_5y_price", cds5yPrice);
  
      // save insuranceValue
      const totalCountryDebt = await debtAdapter.get(country, date, 'value');
      const insuranceValue = await getCountryInsuranceValue(totalCountryDebt, cds5yPrice);
      insuranceAdapter.put(country, date, "value", insuranceValue);
      return insuranceValue;
    } catch (err) {
      console.error(err);
    }
  }


