const WildcardsEntryWebpackPlugin = require('wildcards-entry-webpack-plugin');

module.exports = {
  entry: WildcardsEntryWebpackPlugin.entry('./in/**/*.js'),
  output: {
    filename: 'out/[name].js',
  },
  plugins: [new WildcardsEntryWebpackPlugin()],
};
