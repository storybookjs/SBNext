import React from 'react';
import Component from './button';

// No props
export default () => <Component />;

// with children
export const example1 = () => <Component>with children</Component>;

// with color
export const example2 = () => <Component color="red">colored red</Component>;

// with prefix
export const example3 = () => <Component prefix="prefix - ">prefixed</Component>;
