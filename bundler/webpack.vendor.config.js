const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    sb: ['@sb/core'],
    react: ['react'],
  },
  output: {
    path: resolve('./out'),
    filename: '[name].dll.js',
    library: '[name]_dll',
  },

  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new webpack.DllPlugin({
      path: './out/[name]-manifest.json',
      name: '[name]_dll',
    }),
  ],
};
