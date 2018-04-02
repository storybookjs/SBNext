// TODO: implement these in cli / server / bundler

module.exports = {
  // input
  entryPattern: './in/**/*.example.js',
  pagesPath: './pages',

  // output
  outputPath: 'out',

  // frameworks desired (make sure to install)
  renderers: ['@sb/renderer-vue'],

  // npm-modules (make sure to install) or path
  addons: [],

  webpack: {
    vendor: {
      devTool: 'none',
      module: {},
      performance: {},
      plugins: [],
      resolve: {},
      stats: {},
      target: 'web',
    },
    entries: {
      devTool: 'none',
      module: {},
      performance: {},
      plugins: [],
      resolve: {},
      stats: {},
      target: 'web',
    },
  },
  logLevel: 'info',
};
