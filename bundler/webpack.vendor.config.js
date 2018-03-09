// vendor-bundles.webpack.config.js
const webpack = require('webpack');

module.exports = {
  entry: {
    sb: ['@sb/core'],
    react: ['react'],
  },

  output: {
    filename: 'out/[name].dll.js',
    library: '[name]_dll',
  },

  plugins: [
    new webpack.DllPlugin({
      path: './out/[name]-manifest.json',
      name: '[name]_dll',
    }),
  ],
};
