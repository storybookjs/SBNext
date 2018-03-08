const webpack = require('webpack');
const WildcardsEntryWebpackPlugin = require('wildcards-entry-webpack-plugin');

module.exports = {
  entry: WildcardsEntryWebpackPlugin.entry('./in/**/*.example.js'),
  output: {
    filename: 'out/[name].js',
    library: '[name]_example',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new WildcardsEntryWebpackPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./out/sb-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./out/react-manifest.json'),
    }),
  ],
};
