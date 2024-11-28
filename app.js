const { filterData, countData } = require('./utils');
const data = require('./data');


function main(){
   /**
    * Retrieving the prompt input
    * (slice(2) => to keep only the entered command)
    */
  const args = process.argv.slice(2);
  const filterArg = args.find((arg) => arg.startsWith('--filter='));
  const countArg = args.includes('--count');

  if (filterArg) {
    const pattern = filterArg.split('=')[1];
    console.log(JSON.stringify(filterData(data.data, pattern), null, 2));
  } else if (countArg) {
    console.log(JSON.stringify(data.data, countData(), null, 2));
  } else {
    console.log('Usage: node app.js --filter=<pattern> OR node app.js --count');
  }
}
main();

