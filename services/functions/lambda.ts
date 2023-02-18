import { getCDS5y, getCountryInsuranceValue } from "../core/model";
import { DynamoDBAdapter} from "../adapters/DynamoDB";

export async function main() {
  runCountry('usa').then((value) => {
    console.log(`Insurance Value for Country: ${value}`)
    return 'Success'
  }).catch(err => {
    console.log(err)
  });
}

async function runCountry(country: string) {
  try {
    // define adapter
    const cdsAdapter = new DynamoDBAdapter("dev-btc-intrinsic-CDS");
    const debtAdapter = new DynamoDBAdapter("dev-btc-intrinsic-Debt");
    const currentDate = new Date().toISOString().slice(0,10);

    // save cds5yPrice
    const cds5yPrice = await getCDS5y(country);
    cdsAdapter.put(country, currentDate, "cds_5y_price", cds5yPrice);

    // save insuranceValue
    const totalCountryDebt = await debtAdapter.get(country, currentDate, 'value');
    const insuranceValue = await getCountryInsuranceValue(totalCountryDebt, cds5yPrice);
    // cdsAdapter.put(country, currentDate, "insurance_value", insuranceValue);
    return insuranceValue;
  } catch (err) {
    console.error(err);
  }
}
