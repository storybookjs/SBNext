const React = require('react');

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

module.exports = MyComponent;

console.log(MyComponent, React);
