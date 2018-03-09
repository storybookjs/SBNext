const path = require('path');

const webpack = require('webpack');
const WildcardsEntryWebpackPlugin = require('wildcards-entry-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: WildcardsEntryWebpackPlugin.entry('./in/**/*.example.js'),
  output: {
    filename: 'out/[name].js',
    library: 'example_[id]',
    publicPath: '/',
  },
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
    new WildcardsEntryWebpackPlugin(),
    new webpack.DllReferencePlugin({
      context: resolve('.'),
      manifest: require('./out/sb-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('.'),
      manifest: require('./out/react-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      filename: resolve('./out/iframe.html'),
      inject: false,
      scripts: ['/out/react.dll.js', '/out/sb.dll.js'],
      template: 'templates/iframe.ejs',
      xhtml: true,

      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
      },
    }),
  ],
};
