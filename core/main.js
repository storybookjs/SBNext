const collection = {};
const subscribers = [];

const broadcast = (...params) => subscribers.forEach(fn => fn(...params));
const subscribe = fn => subscribers.push(fn);
const read = () => collection;

const describe = (name1, options1 = {}) => {
  const decorators = [];
  const options = [];
  const api = {
    decorate: fn => {
      decorators.push(fn);
      return api;
    },
    options: obj => {
      options.push(obj);
      return api;
    },
    add: (name2, render, options2 = {}) => {
      const before = collection[name1];
      const after = Object.assign(collection[name1] || {}, {
        [name2]: {
          render,
          options: Object.assign({}, options1, ...options, options2, {
            decorators: []
              .concat(options1.decorators)
              .concat(options.decorators)
              .concat(decorators)
              .concat(options2.decorators),
          }),
        },
      });

      broadcast({ before, after });

      collection[name1] = after;

      return api;
    },
    read,
  };
  return api;
};

module.exports = {
  broadcast,
  subscribe,
  describe,
};
