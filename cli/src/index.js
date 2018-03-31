import commander from 'commander';
import * as commands from './utils/command-list';

// global settings
commander.version('1.0.0', '-v, --version').description('SB CLI');

// add commands
Object.values(commands).forEach(
  // The check is nessesary because babel an extra property to the command-list module
  ({ addToCommander }) => addToCommander && addToCommander(commander)
);

commander.parse(process.argv);
