import * as bundler from '@sb/bundler';

import getConfig from '../utils/config';

export const name = 'serve';

export const run = args => getConfig().then(config => bundler.run(config, args));

export const addToCommander = commander =>
  commander
    .command(name)
    .description('Serve sb in development mode')
    .usage('[flags]')
    .option('-F, --force', 'Force the complete recompilation')
    .action(run);
