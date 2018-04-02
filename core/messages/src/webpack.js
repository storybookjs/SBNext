import logger, { colors } from '@sb/core-logger/node';
import cleanIndent from '@sb/core-logger/clean-indent';
import prettyTime from 'pretty-hrtime';

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
      built ${config.name} ${colors.gray(`(${prettyTime(time)})`)}
    `)
  );
};
