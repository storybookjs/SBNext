import cosmiconfig from 'cosmiconfig';
import * as validators from './config-validators';

const explorer = cosmiconfig('storybook', {
  transform: ({ config }) => ({
    ...config,
    renderers: validators.renderers(config.renderers),
  }),
});

export default () =>
  explorer.load().catch(parsingError => {
    console.error({ parsingError });
    throw parsingError;
  });
