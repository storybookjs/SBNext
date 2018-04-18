export default {
  name: '@sb/renderer-vue',
  dependencies: ['vue', 'vue-template-compiler'],
  loaders: [
    {
      test: /\.vue?$/,
      exclude: /node_modules/,
      use: ['vue-loader'],
    },
  ],
};
