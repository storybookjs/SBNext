const path = require('path');
const webpack = require('webpack');

const { NamedModulesPlugin } = webpack;

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  name: 'vendor',
  entry: {
    sb_core: ['@sb/core-runtime'],
    sb_renderer_react: ['@sb/renderer-react', 'react', 'react-dom'],
  },
  output: {
    path: resolve('./out/dll'),
    filename: '[name]_dll.js',
    library: '[name]_dll',
  },

  mode: 'production',
  devtool: 'source-map',

  plugins: [
    new NamedModulesPlugin(),
    new webpack.DllPlugin({
      context: resolve('.'),
      path: './out/dll/[name]-manifest.json',
      name: '[name]_dll',
    }),
  ],
};
