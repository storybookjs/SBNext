import cosmiconfig from 'cosmiconfig';
import * as validators from './config-validators';

const explorer = cosmiconfig('storybook', {
  transform: ({ config }) => {
    console.log(config);
    return {
      ...config,
      renderers: validators.renderers(config.renderers),
    };
  },
});

export default () =>
  explorer
    .load()
    .then(result => {
      console.log({ result });
      return result;
    })
    .catch(parsingError => {
      console.log({ parsingError });
      throw parsingError;
    });
