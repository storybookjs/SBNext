import logger, { colors } from '@sb/core-logger/node';
import cleanIndent from '@sb/core-logger/clean-indent';
import prettyTime from 'pretty-hrtime';

import * as documentation from './documentation';

export const building = ({ config }) => {
  logger.info(
    cleanIndent(`
      building ${config.name}
    `)
  );
};
export const built = ({ config, time }) => {
  logger.info(
    cleanIndent(`
      built ${config.name} in ${colors.gray(`(${prettyTime(time)})`)}
    `)
  );
};
