const React = require('react');

const MyComponent = ({ color = 'hotpink', children = 'World', prefix = 'Hello' }) => (
  <button style={{ color }}>
    {prefix} {children}
  </button>
);

module.exports = MyComponent;
