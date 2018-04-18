import React from 'react';

const Title = ({ el = 'h1', children = '', ...props }) =>
  React.createElement(el, { className: 'title', ...props }, children);

export default Title;
