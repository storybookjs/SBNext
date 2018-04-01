import chalk from 'chalk';
import loglevel from 'loglevelnext';
import logSymbols from 'log-symbols';
import uuid from 'uuid/v4';

const symbols = {
  trace: chalk.grey('₸'),
  debug: chalk.cyan('➤'),
  info: logSymbols.info,
  warn: logSymbols.warning,
  error: logSymbols.error,
};

const defaults = {
  name: '<unknown>',
  level: 'info',
  unique: true,
};

const prefix = {
  level: opts => symbols[opts.level],
  template: `{{level}} ${chalk.gray('｢{{name}}｣')}: `,
};

export function createLogger(options) {
  const opts = Object.assign({}, defaults, options);
  const { id } = options;

  opts.prefix = Object.assign({}, prefix, options.prefix);
  delete opts.id;

  Object.defineProperty(opts, 'id', {
    get() {
      if (!id) {
        return this.name + (opts.unique ? `-${uuid()}` : '');
      }

      return id;
    },
  });

  if (opts.timestamp) {
    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`;
  }

  const log = loglevel.getLogger(opts);

  if (!Object.prototype.hasOwnProperty.call(log, 'id')) {
    Object.defineProperty(log, 'id', {
      get() {
        return opts.id;
      },
    });
  }

  return log;
}

export default createLogger({ name: 'sb', id: 'storybook' });
