const React = require('react');
const Component = require('./icon');

module.exports = {
  house: () => <Component t="house" />,
  arrow: () => <Component t="arrow" />,
  warning: () => <Component t="warning" />,
  unknown: () => <Component t="__inexistent__" />,
  default: () => <Component />,
};
