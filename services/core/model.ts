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
    const adjustedCDS = (cds5yPrice * 4) / 100
    return adjustedCDS * totalDebt;
}


