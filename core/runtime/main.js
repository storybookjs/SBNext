import logger from '@sb/core-logger';

export const runtime = ({ examples, renderer, type, name }) => {
  const e = Object.assign(Object.create(null), examples);

  logger.info(
    `%cenabled %c${type}%c renderer for %c${name}`,
    'color: inherit;',
    'color: #F1618C; font-weight: 700',
    'color: inherit;',
    'color: #6DABF5; font-weight: 700',
    e
  );

  renderer(Object.values(examples));
};

if (module.hot) {
  module.hot.decline();
}
