const { filterData, countData } = require('./utils');

const actions = {
  '--count': (data) => {
    const countedData = countData(data);
    console.log(JSON.stringify(countedData, null, 2));
  },
  '--filter': (data, pattern) => {
    if (!pattern) {
      console.error('Please provide a valid pattern for --filter.');
      process.exit(1);
    }
    const filteredData = filterData(data, pattern);
    console.log(JSON.stringify(filteredData, null, 2));
  },
};

module.exports = {actions}