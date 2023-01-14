export async function getCDS5y(country: string) {
    const { investing } = require('investing-com-api');
    try {
        const response = await investing(`rates-bonds/usa-5-year-cds`);
        const cds_5y_price = response.data[0].value;
        return cds_5y_price
    } catch (err) {
        console.error(err);
    }
}

export async function getCountryInsuranceValue(totalDebt: Promise<number>, cds5yPrice: number): Promise<number> {
    const debt = await totalDebt;
    return (cds5yPrice * 4) * debt;
}


