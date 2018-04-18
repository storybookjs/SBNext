import webpack from 'webpack';
import webpackServe from 'webpack-serve';

import logger from '@sb/core-logger/node';
import * as webpackMessages from '@sb/core-messages/src/webpack';

import WebSocket from 'ws';

export const serve = ({ configurators, settings, renderers, entryPattern }) =>
  new Promise((resolve, reject) => {
    const time = process.hrtime();
    const config = Object.assign(configurators.serve(), {
      config: configurators.build(Object.assign({}, settings || {}, { renderers, entryPattern })),
    });
    // logger.warn('serving', config.config);

    webpackServe(config).then(server => {
      webpackMessages.built({ time: process.hrtime(time), config: config.config });

      const { compiler } = server;

      server.on('listening', () => {
        logger.info(`${config.config.name} server listening`);

        const socket = new WebSocket(`ws://${config.hot.host || 'localhost'}:${config.hot.port}`);
        socket.on('open', () => {
          resolve({ server, compiler, config, socket });
        });
      });
    });
  });

export const build = ({ configurators, settings, renderers, entryPattern }) =>
  new Promise((resolve, reject) => {
    const time = process.hrtime();
    const config = configurators.build(Object.assign({}, settings, { renderers, entryPattern }));
    // logger.warn('building', config);

    const compiler = webpack(config);

    compiler.run((error, stats) => {
      webpackMessages.built({ config, time: process.hrtime(time) });

      resolve({ config, compiler, stats });
    });
  });
