import webpack from 'webpack';
import serve from 'webpack-serve';
import logger, { hmr } from '@sb/core-logger/node';

import entriesConfig from './webpack.entries.fn';
import vendorConfig from './webpack.vendor.fn';
import serveConfig from './serve.config';

export const configs = {
  entries: entriesConfig,
  vendor: vendorConfig,
  serve: serveConfig,
};

export const defaults = {
  entries: {
    outputPath: 'out',
    entryPattern: './in/**/*.example.js',
    renderers: [],
    plugins: [],
  },
  vendor: {
    renderers: [],
    outputPath: 'out',
    devTool: 'source-map',
    plugins: [],
  },
};

const webpackRegex = /(webpack)/;

const isWebpackRelatedRecursive = ({ request, issuer }) => {
  // if request itself is webpack related
  if (request && request.match && request.match(webpackRegex)) {
    return true;
  }

  // recursively walk into issuer
  if (issuer) {
    return isWebpackRelatedRecursive(issuer);
  }

  return false;
};

export const run = config => {
  const { renderers } = config;

  webpack(configs.vendor({ renderers })).run(() => {
    logger.info('Vendor compiled');
    serve(Object.assign(configs.serve({}), { config: configs.entries({ renderers }) })).then(
      server => {
        logger.info('Entries compiled');
        server.on('listening', () => {
          logger.info('Server listening');
        });

        const { compiler, options } = server;

        compiler.hooks.done.tap('me', ({ compilation }) => {
          hmr.info(compilation.getStats().toString(options.dev.stats));

          try {
            const stats = compilation.getStats().toJson();

            const entryModules = stats.modules
              .filter(m => m.reasons.find(r => r.type === 'single entry'))
              .filter(m => !(m.name && m.name.match(webpackRegex)));

            const entryPoints = Array.from(compilation.entrypoints).reduce((acc, [k, e]) => {
              const modules = e.chunks
                .reduce((acc, c) => acc.concat(c.getModules()), [])
                .filter(m => !isWebpackRelatedRecursive(m))
                .filter(m => !(m.constructor.name !== 'DelegatedModule' && m.context === null))
                .filter(m => m.request || (m.originalRequest && m.originalRequest.request))
                .map(
                  m =>
                    m.originalRequest
                      ? {
                          as: m.originalRequest.rawRequest,
                          hash: m.originalRequest.hash || m.hash,
                          id: m.originalRequest.id || m.id,
                          resource: m.originalRequest.resource,
                        }
                      : {
                          as: m.rawRequest,
                          hash: m.hash,
                          id: m.id,
                          resource: m.resource,
                          exports: m.buildMeta && m.buildMeta.providedExports,
                        }
                );

              const main = entryModules.find(m => m.chunks.find(c => c === k));
              const examples = main.providedExports;

              return Object.assign(acc, {
                [k]: {
                  modules,
                  main,
                  examples,
                },
              });
            }, {});

            logger.trace(entryPoints, { depth: 1 });
          } catch (err) {
            logger.error(err);
          }
        });
      }
    );
  });
};
