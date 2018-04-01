import * as bundler from '@sb/bundler';

import getConfig from '../utils/config';

export const name = 'serve';

export const run = (...args) =>
  getConfig().then(config => {
    // do something with args + settings

    bundler.run(config);
  });

export const addToCommander = commander =>
  commander
    .command(name)
    .description('This is command B')
    .usage(`${name} [flags]`)
    .option('-F, --foo <scope>', 'Foo')
    .action(run);
