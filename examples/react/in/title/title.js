import React from 'react';
import { document } from 'global';

const Title = ({ el = 'h1', children = '', ...props }) =>
  React.createElement(el, { className: 'title', ...props }, children);

export default Title;

document.body.style.background = 'greenyellow';
