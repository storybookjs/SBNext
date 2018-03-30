const loglevel = require('loglevelnext/dist/loglevelnext');

const { MethodFactory } = loglevel.factories;
const css = {
  prefix:
    'color: #999; padding: 0 0 0 20px; line-height: 16px; background: url(https://cdn.rawgit.com/storybooks/press/2a20efb6/logo/v3/icon.svg) no-repeat; background-size: 16px 16px; background-position: 0 -2px;',
  reset: 'color: #444',
};
const log = loglevel.getLogger({ name: 'sb', id: 'storybook' });

log.level = 'info';

function IconFactory(logger) {
  MethodFactory.call(this, logger);
}

IconFactory.prototype = Object.create(MethodFactory.prototype);
IconFactory.prototype.constructor = IconFactory;

IconFactory.prototype.make = function make(methodName) {
  const og = MethodFactory.prototype.make.call(this, methodName);

  return function _(...params) {
    const args = [].concat(params);
    const prefix = '%c｢sb｣ %c';
    const [first] = args;

    if (typeof first === 'string') {
      args[0] = prefix + first;
    } else {
      args.unshift(prefix);
    }

    args.splice(1, 0, css.prefix, css.reset);
    og(...args);
  };
};

log.factory = new IconFactory(log, {});

log.group = console.group; // eslint-disable-line no-console
log.groupCollapsed = console.groupCollapsed; // eslint-disable-line no-console
log.groupEnd = console.groupEnd; // eslint-disable-line no-console

module.exports = log;
