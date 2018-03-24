/* TODO: THIS IS A DOWNLOADED + MODIFIED MODULE
 * after PR is merged + released, we should switch back
 * PR: https://github.com/8427003/wildcards-entry-webpack-plugin/pull/9
*/

const path = require('path');
const glob = require('glob');
const ParserHelpers = require('webpack/lib/ParserHelpers');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');

let globBasedir;

function getEntryName(pathname, basedir, extname) {
  let name;
  if (pathname.startsWith(basedir)) {
    name = pathname.substring(basedir.length + 1);
  }
  return name;
}

class WildcardsEntryWebpackPlugin {
  // make an entry name for every wildcards file;
  // ├── src
  //     ├── a.js
  //     ├── b.js
  //     ├── c.js
  //     └── js
  //         └── index.js
  //
  // eg 1:    @wildcards: "./src/**/*.js", we will wacth './src', and chunk name 'js/index'
  // eg 2:    @wildcards: "./src/js/**/*.js", we will wacth './src/js', and chunk name 'index'
  // eg 3:    @wildcards: "./src/js/**/*.js", @assignEntry: {xxx:'./src/a.js'} and chunk name {index:..., xxx...}
  //
  //
  //
  // @wildcards  string
  // @assignEntry object optional
  static entry(wildcards, assignEntry, namePrefix) {
    if (!wildcards) {
      throw new Error(
        'please give me a wildcards path by invok WildcardsEntryWebpackPlugin.entry!'
      );
    }

    namePrefix = namePrefix ? `${namePrefix}/` : '';
    let basedir;
    let flagIndex = wildcards.indexOf('/*');

    if (flagIndex === -1) {
      flagIndex = wildcards.lastIndexOf('/');
    }
    basedir = wildcards.substring(0, flagIndex);
    const file = wildcards.substring(flagIndex + 1);

    basedir = path.resolve(process.cwd(), basedir);
    globBasedir = basedir = path.normalize(basedir);

    return () => {
      const files = glob.sync(path.resolve(basedir, file));
      const entries = {};
      let entry;
      let dirname;
      let basename;
      let pathname;
      let extname;

      for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        pathname = getEntryName(pathname, basedir, extname);
        entries[namePrefix + pathname] = [entry.replace('.example', '.storybook')];
      }
      Object.assign(entries, assignEntry);
      return entries;
    };
  }

  apply(compiler) {
    const fs = (this && this.fileSystem) || compiler.inputFileSystem;
    const wfs = compiler.watchFileSystem.inputFileSystem;

    compiler.hooks.afterCompile.tap('EntrypointsPlugin', compilation => {
      compilation.contextDependencies.add(globBasedir);
    });

    // compiler.hooks.compilation.tap('EntrypointsPlugin', (a, b, c) => {
    //   console.log('compilation', { a, b, c });
    // });

    compiler.hooks.normalModuleFactory.tap('EntrypointsPlugin', nmf => {
      console.log('normalModuleFactory');

      // nmf.hooks.module.tap('EntrypointsPlugin', result => {
      //   console.log('module', result);
      //   return result;
      // });
      // nmf.hooks.createGenerator.tap('EntrypointsPlugin', result => {
      //   console.log('createGenerator', result);
      //   return result;
      // });
      // nmf.hooks.createModule.tap('EntrypointsPlugin', result => {
      //   console.log('createModule', result);
      //   return result;
      // });
      // nmf.hooks.factory.tap('EntrypointsPlugin', result => {
      //   console.log('factory', result);
      //   return result;
      // });
      // nmf.hooks.generator.tap('EntrypointsPlugin', result => {
      //   console.log('generator', result);
      //   return result;
      // });
      // nmf.hooks.resolver.tap('EntrypointsPlugin', result => {
      //   console.log('resolver', result);
      //   return result;
      // });

      nmf.hooks.beforeResolve.tap('EntrypointsPlugin', result => {
        console.log('beforeResolve', result.request);
        if (!result) return;
        if (result.request.match(/.storybook.js$/)) {
          const wmodulePath = result.request.replace(result.context, '.');
          const wexamplePath = wmodulePath.replace('.storybook.js', '.example.js');

          const modulePath = result.request;
          const examplePath = modulePath.replace('.storybook.js', '.example.js');

          console.log('match');
          VirtualModulePlugin.populateFilesystem({
            fs,
            modulePath,
            contents: `
            import { runtime } from '@sb/core';
            import * as examples from '${examplePath}';
            
            runtime({ examples, m: module, p: '${examplePath}' });
            `,
          });
          wfs._readFileStorage.data.set(modulePath, [
            null,
            `
              import { runtime } from '@sb/core';
              import * as examples from '${examplePath}';
              
              runtime({ examples, m: module, p: '${examplePath}' });
              `,
          ]);
          wfs._readFileStorage.data.set(wmodulePath, [
            null,
            `
              import { runtime } from '@sb/core';
              import * as examples from '${examplePath}';
              
              runtime({ examples, m: module, p: '${examplePath}' });
              `,
          ]);
          debugger;

          // VirtualModulePlugin.populateFilesystem({
          //   fs: wfs,
          //   modulePath: result.request,
          //   contents: `
          //     import { runtime } from '@sb/core';
          //     import * as examples from '${examplePath}';

          //     runtime({ examples, m: module, p:'${examplePath}' });
          //   `,
          // });
        }
        return result;
      });
      // nmf.hooks.afterResolve.tap('EntrypointsPlugin', result => {
      //   if (!result) return;
      //   if (resourceRegExp.test(result.resource)) {
      //     if (typeof newResource === 'function') {
      //       newResource(result);
      //     } else {
      //       result.resource = path.resolve(path.dirname(result.resource), newResource);
      //     }
      //   }
      //   return result;
      // });
    });

    compiler.hooks.compile.tap('EntrypointsPlugin', compilation => {
      console.log('compile', compilation);
      // debugger;

      // compilation.normalModuleFactory.hooks.beforeResolve.tap('EntrypointsPlugin', params => {
      //   const fs = (this && this.fileSystem) || compiler.inputFileSystem;

      //   console.log('beforeResolve');

      //   if (params.request.match(/.storybook.js$/)) {
      //     const examplePath = params.request.replace('.storybook.js', '.example.js');

      //     VirtualModulePlugin.populateFilesystem({
      //       fs,
      //       modulePath: params.request,
      //       contents: `
      //         import { runtime } from '@sb/core';
      //         import * as examples from '${examplePath}';

      //         runtime({ examples, m: module, p:'${examplePath}' });
      //       `,
      //     });
      //   }
      //   return params;
      // });
      // read every module
      // compilation.hooks.buildModule.tap('EntrypointPlugin', params => {
      //   console.log('buildModule', { params });
      //   return params;
      // });
      return compilation;
    });

    // compiler.hooks.compilation.tap('EntrypointsPlugin', (compilation, { normalModuleFactory }) => {
    //   const handler = parser => {
    //     debugger;
    //     console.log({ parser });
    //   };

    //   normalModuleFactory.hooks.parser.for('javascript/auto').tap('EntrypointsPlugin', handler);
    //   normalModuleFactory.hooks.parser.for('javascript/dynamic').tap('EntrypointsPlugin', handler);
    // });

    // gets entries (not on re-compilation)
    // compiler.hooks.entryOption.tap('EntrypointsPlugin', (x, entries) => {
    //   console.log({ entries });
    // });

    // compiler.resolverFactory.plugin('resolver normal', resolver => {
    //   console.log({ resolver });
    //   resolver.hooks.resolve.tapAsync('MyPlugin', params => {
    //     console.log('TEST', params);
    //   });
    // });
  }
}

module.exports = WildcardsEntryWebpackPlugin;
