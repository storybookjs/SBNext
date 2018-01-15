const sb = require('@sb/core');
const React = require('react');

const MyComponent = ({ color = 'hotpink', children = 'World', prefix = 'Hello' }) => (
  <button style={{ color }}>
    {prefix} {children}
  </button>
);

sb
  .describe('Category/Section/Component', { component: MyComponent })
  .add('knobs', ({ data }) => <MyComponent {...data} />, {})
  .add('p2', () => {}, {})
  .add('p3', () => {}, {});
