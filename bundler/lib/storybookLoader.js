const hmrCode = `
import { runtime } from '@sb/core';
runtime(module);
`;

module.exports = source =>
  []
    .concat(source, hmrCode)
    .join('\n')
    .trim();
