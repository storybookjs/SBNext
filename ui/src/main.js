import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { document } from 'global';

const Iframe = ({ url, title }) => (
  <iframe
    style={{ border: '0 none', margin: 0, padding: 0, flex: 1, width: 'auto' }}
    title={title}
    src={url}
  />
);

ReactDOM.render(
  React.createElement(
    'div',
    {
      style: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
      },
    },
    <Fragment>
      <Iframe title="icon" url="http://localhost:1337/icon/icon.example.html" />
      <Iframe title="title" url="http://localhost:1337/title/title.example.html" />
      <Iframe title="button" url="http://localhost:1337/button/button.example.html" />
    </Fragment>
  ),
  document.getElementById('root')
);
