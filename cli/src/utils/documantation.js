import chalk from 'chalk';
import * as constants from './constants';

export const link = name => `${constants.DOCUMENTATION_URL}${name || ''}`;
export const info = name => `Visit ${chalk.bold(link(name))} for documentation about this command.`;
