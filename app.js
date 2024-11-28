const { actions } = require('./actions');
const data = require('./data');

function main() {
  const args = process.argv.slice(2);
  const action = args.find(arg => arg.startsWith('--'));

  if (!action) {
    console.error('Please provide a valid argument: --filter=<pattern> or --count');
    process.exit(1);
  }

  const [command, value] = action.includes('=') ? action.split('=') : [action, null];

  if (!actions[command]) {
    console.error('Invalid argument. Use --filter=<pattern> or --count');
    process.exit(1);
  }

  actions[command](data.data, value);
}

main();