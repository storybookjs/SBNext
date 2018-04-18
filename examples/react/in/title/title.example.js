import React from 'react';
import Component from './title';

export default () => <Component>Default Title</Component>;
export const h1 = () => <Component el="h1">I'm a h1</Component>;
export const h2 = () => <Component el="h2">I'm a h2</Component>;
export const h3 = () => <Component el="h3">I'm a h3</Component>;
export const h4 = () => <Component el="h4">I'm a h4</Component>;
export const h5 = () => <Component el="h5">I'm a h5</Component>;
export const h6 = () => <Component el="h6">I'm a h6</Component>;

export const hasClass = () => (
  <Component el="h3" className="custom">
    custom className (fancy!)
  </Component>
);

export const hasTitle = () => (
  <Component el="h3" title="a title">
    Hover me!
  </Component>
);
