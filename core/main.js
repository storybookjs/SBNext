const collection = {};

module.exports = {
  describe: (name1, options1) => ({
    add: (name2, render, options2 = {}) => {
      collection[name1] = Object.assign(collection[name1] || {}, {
        [name2]: { render, options: Object.assign({}, options1, options2) },
      });
    },
    read: () => collection,
  }),
};
