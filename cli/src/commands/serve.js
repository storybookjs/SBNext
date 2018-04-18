import getConfig from '../utils/config';

export const run = args =>
  Promise.all([getConfig(), import('@sb/bundler')]).then(([config, bundler]) =>
    bundler.run(config, args)
  );

export default commander =>
  commander
    .command('serve')
    .description('Serve sb in development mode')
    .usage('[flags]')
    .option('-F, --force', 'Force the complete recompilation')
    .action(run);
