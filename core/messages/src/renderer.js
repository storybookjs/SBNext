import logger, { colors } from '@sb/core-logger/node';
import cleanIndent from '@sb/core-logger/clean-indent';
import boxen from 'boxen';
import * as documentation from './documentation';

export const unloadable = ({ name }) => {
  const packageref = colors.blue(`@sb/renderer-${name}`);
  logger.error(
    boxen(
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
      `),
      { padding: 1, borderColor: 'yellow', borderStyle: 'round' }
    )
  );
};
export const unknown = ({ obj }) => {
  logger.error(
    boxen(
      cleanIndent(`
        ${colors.red.bold('The object supplied does not match the interface of a renderer.')}
        Please check the storybook config; you're using something like:
        
        ${colors.gray(`renderer: [${colors.orange(JSON.stringify(obj))}],`)}

        The object should match this interface:
        ${colors.gray(
          `{ name: ${colors.pink('string')}, dependencies ${colors.pink('Array<string>')} }`
        )}

        Learn more about renderers at ${documentation.link('/renderers')}
      `),
      { padding: 1, borderColor: 'yellow', borderStyle: 'round' }
    )
  );
};
export const foundInAsset = ({ name, assets }) => {
  const list = assets.map(a => colors.orange(a)).join(', ');
  const s = list.length > 1 ? 's' : '';

  logger.warn(
    `Renderer found in asset warning:\n${boxen(
      cleanIndent(`
        The output/asset${s}: ${list} appear to include a sb renderer!

        This could be a mistake. It won't likely break anything, but it very un-optimized.
        You should probably configure storybook to extract the renderer!

        You will likely need to add the renderer:
        ${colors.gray(`renderer: ['${colors.orange(`@sb/renderer-${name}`)}']`)},

        Learn more about configuration at ${documentation.link('/configuration')}
        Learn more about renderers at ${documentation.link('/renderers')}
      `),
      { padding: 1, borderColor: 'yellow', borderStyle: 'round' }
    )}`
  );
};
