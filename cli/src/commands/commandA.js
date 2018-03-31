export const name = 'commandA';

export const run = (...args) => console.log('📓', `${name} executed`, args);

export const addToCommander = commander =>
  commander
    .command(name)
    .description('This is command A')
    .usage(`${name} [flags]`)
    .option('-F, --foo <scope>', 'Foo')
    .action(run);
