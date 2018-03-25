import React from 'react';

const icons = {
  house: () => (
    <svg>
      <circle stroke="orangered" />
    </svg>
  ),
  arrow: () => (
    <svg>
      <circle stroke="deepskyblue" />
    </svg>
  ),
  warning: () => (
    <svg>
      <circle stroke="orange" />
    </svg>
  ),
};

const MyComponent = ({ t }) => (t && icons[t] ? t() : null);
console.log(MyComponent, React);

export default MyComponent;

document.body.style.background = 'deeppink';
