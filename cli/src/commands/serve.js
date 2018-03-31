import * as bundler from '@sb/bundler';

export const name = 'serve';

export const run = (...args) => bundler.run();

export const addToCommander = commander =>
  commander
    .command(name)
    .description('This is command B')
    .usage(`${name} [flags]`)
    .option('-F, --foo <scope>', 'Foo')
    .action(run);
