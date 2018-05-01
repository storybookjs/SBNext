import fs from 'fs';
import logger, { hmr } from '@sb/core-logger/node';
import stripAnsi from 'strip-ansi';
import * as rendererMessages from '@sb/core-messages/src/renderer';
import * as webpackMessages from '@sb/core-messages/src/webpack';

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
          : webpackMessages.skipped({ config: { name: 'vendor' } })
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

      const state = {};
      // const state = {
      //   invalids: [],
      // };

      // entries.compiler.hooks.invalid.tap('me', m => {
      //   state.invalids.push(m);
      // });

      manager.socket.on('message', message => {
        // if request is for entries but entries isn't known yet, we'll send them eventually
        // if entries ARE known, we might have a slow connecting client, so we send previous result
        if (message.substr('pull') && state.entries && JSON.parse(message).type === 'pull') {
          const data = {
            type: 'broadcast',
            data: {
              type: 'push',
              data: state.entries,
            },
          };

          manager.socket.send(stringify(data));
        }
      });

      entries.compiler.hooks.done.tap('me', ({ compilation }) => {
        try {
          const stats = compilation.getStats({
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
          });

          hmr.info(
            `built: \n${stats
              .toString({
                colors: true,
              })
              .split('\n')
              .filter(
                m =>
                  !(
                    m.includes('delegated') ||
                    m.includes('hot-client') ||
                    m.includes('multi') ||
                    m.includes('hot-update')
                  ) &&
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
        } catch (error) {
          logger.error(error);
        }

        // state.invalids = [];

        try {
          state.entries = toStore(compilation);

          const data = {
            type: 'broadcast',
            data: {
              type: 'push',
              data: state.entries,
            },
          };

          manager.socket.send(stringify(data));

          // logger.debug(state.entries);
        } catch (err) {
          logger.error(err);
        }
      });
    })
    .catch(err => {
      logger.error(err);
    });
};
