import chalk from 'chalk';
import loglevel from 'loglevelnext';
import uuid from 'uuid/v4';
import osLocale from 'os-locale';

export const colors = {
  pink: chalk.hex('F1618C'),
  purple: chalk.hex('B57EE5'),
  orange: chalk.hex('F3AD38'),
  green: chalk.hex('A2E05E'),
  blue: chalk.hex('6DABF5'),
  red: chalk.hex('F16161'),
  gray: chalk.gray,
};

const locale = osLocale.sync().replace('_', '-');

const getLevels = colorSupportLevel => {
  switch (colorSupportLevel) {
    case 1: {
      return {
        trace: chalk.gray,
        debug: chalk.cyan,
        info: chalk.blue,
        warn: chalk.yellow,
        error: chalk.red,
      };
    }
    case 2:
    case 3: {
      return {
        trace: colors.gray,
        debug: colors.purple,
        info: colors.blue,
        warn: colors.orange,
        error: colors.red,
      };
    }
    default: {
      return {
        trace: text => `₸ ${text}`,
        debug: text => `➤ ${text}`,
        info: text => `ⓘ ${text}`,
        warn: text => `⚠ ${text}`,
        error: text => `⚑ ${text}`,
      };
    }
  }
};

export const levels = getLevels(chalk.level);

const defaults = {
  name: '<unknown>',
  level: 'info',
  unique: true,
};

const prefix = {
  time: opts => levels[opts.level](`[${new Date().toLocaleTimeString(locale)}]`),
  level: opts => levels[opts.level](`[${opts.logger.name}]`),
  template: '{{level}} ',
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
    opts.prefix.template = `{{time}} ${opts.prefix.template}`;
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

export default createLogger({ name: 'sb', id: 'storybook', timestamp: true });

export const hmr = createLogger({ name: 'wp', id: 'storybook-webpack', timestamp: true });
