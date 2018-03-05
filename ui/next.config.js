const { default: config } = require('@sb/serve/config');
const { entries } = require('@sb/serve/docs');

const getDocs = async () => {
  const all = await entries();

  return all.map(i => i.data).reduce(
    (prev, entry) => ({
      ...prev,
      [entry.url]: {
        page: '/docs',
        query: { doc: entry },
      },
    }),
    {}
  );
};

module.exports = config({
  exportPathMap: async () => {
    const docs = await getDocs();

    // console.log(docs);

    return {
      '/': { page: '/' },
      '/docs/': { page: '/docs' },
      ...docs,

      // will remove i favour of iframe in server.js
      '/preview-1': { page: '/preview-1' },
      '/preview-2': { page: '/preview-2' },
      '/preview-3': { page: '/preview-3' },
    };
  },
});
