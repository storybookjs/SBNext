import commander from 'commander';
import logger from '@sb/core-logger/node';
import * as timer from '@sb/core-messages/src/timer';
import * as commands from './utils/command-list';

const time = process.hrtime();

// global settings
commander.version('1.0.0', '-v, --version').description('SB CLI');

// add commands
Object.entries(commands).forEach(([key, addCommandToCommander]) => {
  if (typeof addCommandToCommander === 'function') {
    addCommandToCommander(commander);
  } else {
    logger.error(`${key} could not be added to commander`);
  }
});

// parse arguments and feed into command
commander.parse(process.argv);

timer.trace('CLI commands loaded', process.hrtime(time));
