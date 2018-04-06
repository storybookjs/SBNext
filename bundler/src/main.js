import fs from 'fs';
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

const detectVendors = input => {
  const config = vendor.build(input);

  return Promise.all(
    Object.keys(config.entry).map(
      key =>
        new Promise((resolve, reject) => {
          fs.access(`${config.output.path}/${key}_dll.js`, err => (err ? reject() : resolve()));
        })
    )
  )
    .then(() => false)
    .catch(() => true);
};

export const run = (settings, flags) => {
  const { renderers, entryPattern } = settings;

  logger.info(flags);

  detectVendors({
    settings: settings.webpack.vendor || {},
    renderers,
    entryPattern,
  })
    .then(
      needed =>
        needed || flags.force
          ? webpackAsPromised({
              configurators: vendor,
              settings: settings.webpack.vendor || {},
              renderers,
              entryPattern,
            })
          : logger.info('skipped vendor build')
    )
    .then(() =>
      Promise.all([
        serveAsPromised({
          configurators: manager,
          setting: settings.webpack.manager || {},
          renderers,
          entryPattern,
        }),
        serveAsPromised({
          configurators: entries,
          settings: settings.webpack.entries || {},
          renderers,
          entryPattern,
        }),
      ])
    )
    .then(([manager, entries]) => {
      // now we have both manager and entries listening!
      // we can communicate entries changes to the manager!

      // const state = {
      //   invalids: [],
      // };

      // entries.compiler.hooks.invalid.tap('me', m => {
      //   state.invalids.push(m);
      // });

      entries.compiler.hooks.done.tap('me', ({ compilation }) => {
        try {
          const stats = compilation.getStats();

          hmr.info(
            `built: \n${stats
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
              type: 'x',
              data: compilation.getStats().toJson(),
            },
          };

          manager.socket.send(stringify(data));
        } catch (error) {
          logger.error(error);
        }

        // state.invalids = [];

        try {
          const data = toStore(compilation);
          logger.debug(data);
        } catch (err) {
          logger.error(err);
        }
      });
    })
    .catch(err => {
      logger.error(err);
    });
};
