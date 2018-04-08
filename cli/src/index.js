import logger from '@sb/core-logger/node';
import * as commands from './utils/command-list';
import prettyTime from 'pretty-hrtime';

const time = process.hrtime();
const commander = require('commander');

// global settings
commander.version('1.0.0', '-v, --version').description('SB CLI');

// add commands
Object.values(commands).forEach(
  // The check is necessary because babel adds an extra property to the command-list module
  ({ addToCommander }) => addToCommander && addToCommander(commander)
);

commander.parse(process.argv);
logger.debug(`CLI commands run: ${prettyTime(process.hrtime(time))}`);
