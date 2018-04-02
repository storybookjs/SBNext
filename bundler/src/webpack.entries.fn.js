import path from 'path';
import webpack from 'webpack';

import WildcardsEntryWebpackPlugin from './lib/entrypointsPlugin';
import GeneratePagePlugin from './lib/generatePageplugin';
import { toSafeFilename } from './lib/util';

const { NamedModulesPlugin } = webpack;

const resolve = dir => path.join(__dirname, dir);
const resolveLocal = dir => path.join(process.cwd(), dir);

export default ({
  outputPath = resolveLocal('out'),
  entryPattern = `${process.cwd()}/in/**/*.example.js`,
  renderers = [],
  devTool = 'source-map',
  plugins = [],
}) => ({
  name: 'entries',
  entry: WildcardsEntryWebpackPlugin.entry(entryPattern),
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
        test: /\.example.jsx?$/,
        exclude: /node_modules/,
        use: ['@sb/core-loader'],
      },
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
    new WildcardsEntryWebpackPlugin(),
    new GeneratePagePlugin({
      template: resolve('./templates/iframe.ejs'),
      parser: require('ejs'),
      appMountIds: ['root'],
    }),
    new webpack.DllReferencePlugin({
      context: resolveLocal('.'),
      manifest: require(`${outputPath}/dll/sb_core-manifest.json`),
    }),
    ...renderers.map(
      r =>
        new webpack.DllReferencePlugin({
          context: resolveLocal('.'),
          manifest: require(`${outputPath}/dll/${toSafeFilename(r.name)}-manifest.json`),
        })
    ),
    ...plugins,
  ],
});
