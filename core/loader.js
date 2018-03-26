const storybookCode = `
import { runtime } from '@sb/core';
runtime(module, __webpack_exports__);
`;

module.exports = source =>
  []
    .concat(source, storybookCode)
    .join('\n')
    .trim();
