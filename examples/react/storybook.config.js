// TODO: implement these in cli / server / bundler

module.exports = {
  // input
  entryPattern: './in/**/*.example.js',
  pagesPath: './pages',

  // output
  outputPath: 'out',

  // frameworks desired (make sure to install)
  renderers: ['react'],

  // npm-modules (make sure to install), path, or maybe even function
  addons: [],

  webpack: {
    vendor: {
      devTool: 'source-map',
      module: {},
      performance: {},
      plugins: [],
      resolve: {},
      stats: {},
      target: 'web',
    },
    entries: {
      devTool: 'source-map',
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
