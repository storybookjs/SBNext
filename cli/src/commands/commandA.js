import logger from '@sb/core-logger/node';

export const name = 'commandA';

export const run = (...args) => {
  logger.info(`${name} executed`, args);
};

export const addToCommander = commander =>
  commander
    .command(name)
    .description('This is command A')
    .usage(`${name} [flags]`)
    .option('-F, --foo <scope>', 'Foo')
    .action(run);
