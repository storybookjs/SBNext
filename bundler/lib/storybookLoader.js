const hmrCode = `
import { runtime } from '@sb/core';
runtime(module, __webpack_exports__);
`;

module.exports = source =>
  []
    .concat(source, hmrCode)
    .join('\n')
    .trim();
