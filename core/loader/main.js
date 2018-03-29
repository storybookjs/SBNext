const storybookCode = type => `
import { runtime } from '@sb/core-runtime';
import { renderer } from '@sb/renderer-${type}';

setTimeout(runtime, 0, module, __webpack_exports__, renderer);
`;

const getType = source => 'react';

module.exports = source =>
  []
    .concat(storybookCode(getType(source)), source)
    .join('\n')
    .trim();
