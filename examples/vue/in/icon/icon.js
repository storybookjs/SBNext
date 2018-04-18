import React from 'react';
import { document } from 'global';

const icons = {
  house: () => (
    <svg width={50} height={50}>
      <circle stroke="orangered" cx="25" cy="25" r="25" />
    </svg>
  ),
  arrow: () => (
    <svg width={50} height={50}>
      <circle stroke="deepskyblue" cx="25" cy="25" r="25" />
    </svg>
  ),
  warning: () => (
    <svg width={50} height={50}>
      <circle stroke="orange" cx="25" cy="25" r="25" />
    </svg>
  ),
};

const MyComponent = ({ t }) => (t && icons[t] ? icons[t]() : null);

export default MyComponent;

document.body.style.background = 'hotpink';
