import cosmiconfig from 'cosmiconfig';
import logger from '@sb/core-logger/node';
import * as validators from './config-validators';

const explorer = cosmiconfig('storybook', {
  transform: ({ config }) => ({
    ...config,
    renderers: validators.renderers(config.renderers),
  }),
});

export default () =>
  explorer.load().catch(parsingError => {
    logger.error({ parsingError });
    throw parsingError;
  });
