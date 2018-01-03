const { default: config } = require('@sb/serve/config');
const { entries, inCategory } = require('@sb/serve/posts');

const getStories = async () => {
  const category = 'stories';
  const all = await entries();
  return all
    .filter(inCategory(category, { includeSubCategories: true }))
    .map(post => post.data.category)
    .filter((category, idx, arr) => arr.indexOf(category) === idx)
    .reduce(
      (prev, entry) => ({
        ...prev,
        [`/${entry.replace(`${category}/`, '')}`]: {
          page: '/stories',
          query: { category: `${entry}` },
        },
      }),
      {}
    );
};

module.exports = config({
  exportPathMap: async () => {
    const stories = await getStories();
    return {
      '/all-posts': { page: '/all-posts' },
      '/sub-section': { page: '/sub-section' },
      '/tags': { page: '/tags' },
      ...stories,
    };
  },
});
