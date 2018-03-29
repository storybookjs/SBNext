import React from 'react';
import ReactDOM from 'react-dom';
import { document } from 'global';

export const renderer = items => {
  ReactDOM.render(
    React.createElement(
      'div',
      {},
      items.map((item, index) => React.createElement('div', { key: index }, item()))
    ),
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.decline();
}
