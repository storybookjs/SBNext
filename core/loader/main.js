const storybookCode = ({ type, name }) => `
import { runtime } from '@sb/core-runtime';
import { renderer } from '@sb/renderer-${type}';
import logger from '@sb/core-logger';

logger.info('HMR activated');

// ENABLE HMR
if (module && module.hot) {
  module.hot.accept(error => {
    logger.info('MODULE ACCEPTED', error);
  });
  module.hot.dispose(() => {
    logger.warn('MODULE DISPOSED');
  });
}

setTimeout(runtime, 0, { examples: __webpack_exports__, renderer, type: '${type}', name: '${name}'});
`;

const getType = source => 'react';

module.exports = function loader(source) {
  return []
    .concat(
      storybookCode({ type: getType(source), name: this.resourcePath.replace(this.context, '') }),
      source
    )
    .join('\n')
    .trim();
};
