// vendor-bundles.webpack.config.js
const webpack = require('webpack');

module.exports = {
  entry: {
    sb: ['@sb/core'],
    react: ['react'],
  },

  output: {
    filename: 'out/[name].js',
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: './out/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib',
    }),
  ],
};
