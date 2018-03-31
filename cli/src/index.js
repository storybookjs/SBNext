import commander from 'commander';
import * as commands from './utils/command-list';

// global settings
commander.version('1.0.0', '-v, --version').description('SB CLI');

// add commands
Object.values(commands).forEach(({ addToCommander }) => {
  addToCommander(commander);
});

commander.parse(process.argv);
