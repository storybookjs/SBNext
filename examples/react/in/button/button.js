import React from 'react';

const MyComponent = ({ color = 'hotpink', children = 'World', prefix = 'Hello' }) => (
  <button style={{ color }}>
    {prefix} {children}
  </button>
);

export default MyComponent;
