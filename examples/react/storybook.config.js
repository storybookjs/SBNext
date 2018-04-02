// TODO: implement these in cli / server / bundler

module.exports = {
  // input
  entryPattern: './in/**/*.example.js',
  pagesPath: './pages',

  // output
  outputPath: 'out',

  // frameworks desired (make sure to install)
  renderers: ['@sb/renderer-react'],

  // npm-modules (make sure to install) or path to module,
  addons: ['@sb/addon-testaddon'],

  webpack: {
    vendor: {
      devTool: 'eval',
      module: {},
      performance: {},
      plugins: [],
      resolve: {},
      stats: {},
    },
    entries: {
      devTool: 'eval',
      module: {},
      performance: {},
      plugins: [],
      resolve: {},
      stats: {},
    },
  },
  logLevel: 'info',
};
