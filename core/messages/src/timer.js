import logger, { colors } from '@sb/core-logger/node';
import cleanIndent from '@sb/core-logger/clean-indent';
import prettyTime from 'pretty-hrtime';

export const trace = (name, time) => {
  logger.debug(cleanIndent(`${name} took ${colors.purple(prettyTime(time))}`));
};
