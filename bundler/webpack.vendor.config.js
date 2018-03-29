const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    sb_core: ['@sb/core-runtime'],
    sb_renderer_react: ['@sb/renderer-react', 'react'],
    // react: ['react'],
  },
  output: {
    path: resolve('./out/dll'),
    filename: '[name]_dll.js',
    library: '[name]_dll',
  },

  mode: 'production',
  devtool: 'source-map',

  plugins: [
    new webpack.DllPlugin({
      context: resolve('.'),
      path: './out/dll/[name]-manifest.json',
      name: '[name]_dll',
    }),
  ],
};
