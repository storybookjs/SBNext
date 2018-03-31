export const name = 'commandB';

export const run = (...args) => console.log('📓', `${name} executed`, args);

export const addToCommander = commander =>
  commander
    .command(name)
    .description('This is command B')
    .usage(`${name} [flags]`)
    .option('-F, --foo <scope>', 'Foo')
    .action(run);
