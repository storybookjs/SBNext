import React from 'react';
import { document } from 'global';

const MyComponent = ({ color = 'hotpink', children = 'World', prefix = 'Hello' }) => (
  <button style={{ color }}>
    {prefix} {children}
  </button>
);

export default MyComponent;

document.body.style.background = 'deepskyblue';
