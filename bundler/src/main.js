import logger, { hmr } from '@sb/core-logger/node';
import stripAnsi from 'strip-ansi';
import * as rendererMessages from '@sb/core-messages/src/renderer';

import stringify from 'json-stringify-safe';

import { serve as serveAsPromised, build as webpackAsPromised } from './lib/webpack-as-promised';
import { toStore } from './lib/util';

import managerConfig from './webpack.manager.fn';
import managerServeConfig from './manager.serve.config';

import vendorConfig from './webpack.vendor.fn';

import entriesConfig from './webpack.entries.fn';
import entriesServeConfig from './entries.serve.config';

const vendor = {
  build: vendorConfig,
};
const entries = {
  build: entriesConfig,
  serve: entriesServeConfig,
};
const manager = {
  build: managerConfig,
  serve: managerServeConfig,
};

const ignoredPackages = /(hot-update|\.html|\.map)/;

export const run = settings => {
  const { renderers, entryPattern } = settings;

  // should detect necessity and pause needed!
  webpackAsPromised({
    configurators: vendor,
    settings: settings.webpack.vendor || {},
    renderers,
    entryPattern,
  }).then(({ config, compiler }) => {
    //
  });

  serveAsPromised({
    configurators: manager,
    setting: settings.webpack.manager || {},
    renderers,
    entryPattern,
  })
    .then(({ server, compiler, config, socket }) => {
      const data = {
        type: 'broadcast',
        data: {
          type: 'boo',
          data: {},
        },
      };

      // setInterval(() => {
      //   socket.send(stringify(data));
      // }, 1000);
    })
    .catch(err => {
      logger.error(err);
    });

  serveAsPromised({
    configurators: entries,
    settings: settings.webpack.entries || {},
    renderers,
    entryPattern,
  }).then(({ server, compiler, config, socket }) => {
    // compilation.hotUpdateChunkTemplate.hooks.modules.tap('me', (...args) => {
    //   logger.warn({ hotUpdateChunkTemplate: args });
    // });

    const state = {
      invalids: [],
    };

    compiler.hooks.invalid.tap('me', m => {
      state.invalids.push(m);
    });

    compiler.hooks.done.tap('me', ({ compilation }) => {
      try {
        hmr.info(
          `built: \n${compilation
            .getStats()
            .toString({
              all: false,
              assets: true,
              modules: true,
              chunks: false,
              cached: true,
              excludeAssets: assetName => assetName.match(ignoredPackages),

              errors: true,
              errorDetails: true,
              warnings: true,
              moduleTrace: true,
              colors: true,
            })
            .split('\n')
            .filter(
              m =>
                !(m.includes('delegated') || m.includes('hot-client') || m.includes('multi')) &&
                (m.includes('[built]') || m.includes('[emitted]'))
            )
            .sort((a, b) => {
              if (a.includes('[built]') && !b.includes('[built]')) {
                return -1;
              }
              // if (a.includes('[built]') && a.includes('[built]')) {
              //  todo sort alphabetical
              // }
              return 1;
            })
            .map(m => {
              if (m.includes('renderers/')) {
                const [, renderer] = m.match(/renderers.(.*?)\/.*(\{.*?\})/);
                const files = m.match(/\{.*?\}/g);
                rendererMessages.foundInAsset({
                  name: stripAnsi(renderer),
                  assets: files.map(f => stripAnsi(f).slice(1, -1)),
                });
              }
              return m;
            })
            // .reduce(
            //   (acc, item) =>
            //     // I want to remove assets that did not have a chunk changed
            //     acc.find(i => i.includes('[built]') && i.includes('{button/button.example}'))
            // )
            .join('\n')}`
        );
        const data = {
          type: 'broadcast',
          data: {
            type: 'window-reload',
            data: {},
          },
        };

        socket.send(stringify(data));
      } catch (error) {
        logger.error(error);
      }

      state.invalids = [];

      try {
        const data = toStore(compilation);
        logger.debug(data);
      } catch (err) {
        logger.error(err);
      }
    });
  });
};
