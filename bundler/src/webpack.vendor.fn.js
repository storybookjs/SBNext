import path from 'path';
import webpack from 'webpack';

import { toSafeFilename } from './lib/util';

const { NamedModulesPlugin } = webpack;

const resolveLocal = dir => path.join(process.cwd(), dir);

export default ({
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
      [toSafeFilename(r.name)]: [r.name, ...r.dependencies],
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
