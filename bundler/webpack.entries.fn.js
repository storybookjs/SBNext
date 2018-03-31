const path = require('path');

const webpack = require('webpack');
const WildcardsEntryWebpackPlugin = require('./lib/entrypointsPlugin');
const GeneratePagePlugin = require('./lib/generatePageplugin');

const { NamedModulesPlugin } = webpack;

const resolve = dir => path.join(__dirname, dir);
const resolveLocal = dir => path.join(process.cwd(), dir);

module.exports = ({
  outputPath = resolveLocal('out'),
  entryPattern = './in/**/*.example.js',
  renderers = [],
  plugins = [],
}) =>
  console.log({ outputPath }) || {
    name: 'entries',
    entry: WildcardsEntryWebpackPlugin.entry(entryPattern),
    output: {
      path: outputPath,
      filename: '[name].js',
      library: 'example_[hash]',
      publicPath: '/',
    },

    mode: 'development',
    devtool: 'source-map',

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
        parser: 'ejs',
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
            manifest: require(`${outputPath}/dll/sb_renderer_${r.name}-manifest.json`),
          })
      ),
      ...plugins,
    ],
  };
