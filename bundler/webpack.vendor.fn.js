const path = require('path');
const webpack = require('webpack');

const { NamedModulesPlugin } = webpack;

const resolveLocal = dir => path.join(process.cwd(), dir);

module.exports = ({
  renderers = [],
  outputPath = resolveLocal('out'),
  devTool = 'source-map',
  plugins = [],
}) => ({
  name: 'vendor',
  entry: Object.assign(
    {
      sb_core: ['@sb/core-runtime'],
    },
    ...renderers.map(r => ({
      [`sb_renderer_${r.name}`]: [`@sb/renderer-${r.name}`, ...r.dependencies],
    }))
  ),
  output: {
    path: `${outputPath}/dll`,
    filename: '[name]_dll.js',
    library: '[name]_dll',
  },

  mode: 'production',
  devtool: devTool,

  plugins: [
    new NamedModulesPlugin(),
    new webpack.DllPlugin({
      context: resolveLocal('.'),
      path: `${outputPath}/dll/[name]-manifest.json`,
      name: '[name]_dll',
    }),
    ...plugins,
  ],
});
