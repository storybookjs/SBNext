import webpack from 'webpack';
import serve from 'webpack-serve';
import logger, { hmr } from '@sb/core-logger/node';

import { toStore, webpackRegex } from './lib/util';

import entriesConfig from './webpack.entries.fn';
import vendorConfig from './webpack.vendor.fn';
import serveConfig from './serve.config';

export const configs = {
  entries: entriesConfig,
  vendor: vendorConfig,
  serve: serveConfig,
};

const ignoredPackages = /(hot-update|\.html|\.map)/;

export const run = config => {
  const { renderers } = config;

  webpack(configs.vendor({ renderers })).run(() => {
    logger.info('Vendor compiled');
    serve(Object.assign(configs.serve({}), { config: configs.entries({ renderers }) })).then(
      server => {
        const { compiler, options } = server;

        logger.info('Entries compiled');

        server.on('listening', () => {
          logger.info('Server listening');
        });

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
          hmr.info(
            `\n${compilation
              .getStats()
              .toString({
                all: false,
                assets: true,
                modules: true,
                chunks: false,
                cached: true,
                excludeAssets: assetname => assetname.match(ignoredPackages),

                errors: true,
                errorDetails: true,
                warnings: true,
                moduleTrace: true,
                colors: true,
              })
              .split('\n')
              .filter(
                m =>
                  !(m.includes('delegated') || m.includes('hot-client')) &&
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
              // .reduce(
              //   (acc, item) =>
              //     // I want to remove assets that did not have a chunk changed
              //     acc.find(i => i.includes('[built]') && i.includes('{button/button.example}'))
              // )
              .join('\n')}`
          );

          state.invalids = [];

          try {
            const data = toStore(compilation);
            logger.trace(data);
          } catch (err) {
            logger.error(err);
          }
        });
      }
    );
  });
};
