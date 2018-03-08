const React = require('react');
const Component = require('./button');

module.exports = {
  default: () => <Component />,
  'with children': () => <Component>with children</Component>,
  'with color': () => <Component color="red">colored red</Component>,
  'with prefix': () => <Component prefix="prefix - ">prefixed</Component>,
};
