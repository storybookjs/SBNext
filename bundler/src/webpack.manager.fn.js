import path from 'path';
import webpack from 'webpack';

import GeneratePagePlugin from './lib/generatePageplugin';

const { NamedModulesPlugin } = webpack;

const resolve = dir => path.join(__dirname, dir);
const resolveLocal = dir => path.join(process.cwd(), dir);

export default ({
  outputPath = resolveLocal('out'),
  ui = ['@sb/app'],
  renderers = [],
  devTool = 'source-map',
  plugins = [],
}) => ({
  name: 'manager',
  entry: { index: ui },
  output: {
    path: outputPath,
    filename: '[name].js',
    library: 'example_[hash]',
    publicPath: '/',
  },

  mode: 'development',
  devtool: devTool,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new GeneratePagePlugin({
      template: resolve('./templates/iframe.ejs'),
      parser: require('ejs'),
      appMountIds: ['root'],
    }),
  ],
});
