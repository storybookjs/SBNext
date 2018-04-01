import { colors } from '@sb/core-logger/node';
import * as constants from './constants';

export const link = name => colors.blue.underline(`${constants.DOCUMENTATION_URL}${name || ''}`);
export const info = name => `Visit ${link(name)} for documentation about this command.`;
