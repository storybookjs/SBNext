import logger, { colors } from '@sb/core-logger/node';
import * as documentation from './documentation';
import cleanIndent from '@sb/core-logger/clean-indent';

export const unloadable = ({ name }) => {
  const packageref = colors.blue(`@sb/renderer-${name}`);
  logger.error(
    cleanIndent(`
      ${colors.red.bold('Loading of a renderer failed.')}
      Please check your storybook config; you're using something like:
      
      ${colors.gray(`renderer: ['${colors.orange(name)}']`)},

      This maps to a npm package: ${packageref}

      Perhaps you need to install this package: 
      > ${colors.gray(`npm install ${packageref} --save`)}

      If it won't install perhaps you made a spelling mistake? Find the correct package name by searching npm:
      > ${colors.gray(`npm search @sb/renderer-${name}`)}
              
      Learn more about renderers at ${documentation.link(
        '/renderers'
      )}, this also includes a list of all renderers. 
      Alternatively you can search npm from your terminal:
      > ${colors.gray('npm search @sb/renderer')}
    `)
  );
};
export const unknown = ({ obj }) => {
  logger.error(
    cleanIndent(`
      ${colors.red.bold('The object supplied does not match the interface of a renderer.')}
      Please check the storybook config; you're using something like:
      
      ${colors.gray(`renderer: [${colors.orange(JSON.stringify(obj))}],`)}

      The object should match this interface:
      ${colors.gray(
        `{ name: ${colors.pink('string')}, dependencies ${colors.pink('Array<string>')} }`
      )}

      Learn more about renderers at ${documentation.link('/renderers')}
    `)
  );
};
export const foundInAsset = ({ name, assets }) => {
  logger.warn(
    cleanIndent(`
      The output/assets: ${assets
        .map(a => colors.orange(a))
        .join(', ')} appear to include a sb renderer!

      This could be a mistake. It won't likely break anything, but it very un-optimized.

      You should probably configure storybook to extract the renderer!

      You will likely need to add the renderer:
      ${colors.gray(`renderer: ['@sb/renderer-${colors.orange(name)}']`)},

      Learn more about configuration at ${documentation.link('/configuration')}
      Learn more about renderers at ${documentation.link('/renderers')}
    `)
  );
};
