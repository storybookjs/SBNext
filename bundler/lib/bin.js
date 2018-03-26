const serve = require('webpack-serve');
const config = require('../webpack.entries.config.js');
const options = require('../serve.config');

serve(Object.assign(options, { config })).then(server => {
  server.on('listening', () => {});

  options.open = {
    path: 'button/button.example.html',
  };
  // const { compiler, options } = server;
  // debugger;

  // console.log({ server });
});
