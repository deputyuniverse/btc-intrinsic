import { runCountryForDay } from "../core/model";

export async function main() {
  const currentDate = new Date().toISOString().slice(0,10);
  runCountryForDay('usa', currentDate).then((value) => {
    console.log(`Insurance Value for Country: ${value}`)
    return 'Success'
  }).catch(err => {
    console.log(err)
  });
}


