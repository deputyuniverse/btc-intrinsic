import { getCDS5y, getCountryInsuranceValue } from "../core/model";
import { DynamoDBAdapter} from "../adapters/DynamoDB";

export async function main() {
  const insuranceValue = await runCountry('usa');
  console.log(insuranceValue);
  return {};
}

async function runCountry(country: string) {
  try {
    // define adapter
    const adapter = new DynamoDBAdapter("CDS");
    const currentDate = new Date().toISOString().slice(0,10);

    // save cds5yPrice
    const cds5yPrice = await getCDS5y(country);
    console.log(cds5yPrice)
    adapter.put(country, currentDate, "cds_5y_price", cds5yPrice);

    // save insuranceValue
    const totalCountryDebt = adapter.get(country, currentDate);
    const insuranceValue = getCountryInsuranceValue(totalCountryDebt, cds5yPrice);
    adapter.put(country, currentDate, "insurance_value", insuranceValue);
    return insuranceValue;
  } catch (err) {
    console.error(err);
  }
}
