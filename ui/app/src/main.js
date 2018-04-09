import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { document, WebSocket } from 'global';

import Preview from '@sb/components/src/preview/Preview.jsx';

const Iframe = ({ url, title }) => (
  <iframe
    style={{ border: '0 none', margin: 0, padding: 0, flex: 1, width: 'auto' }}
    title={title}
    src={url}
  />
);

class App extends Component {
  state = {
    examples: [],
  };
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:8082');

    this.socket.addEventListener('open', () => {
      this.socket.send(
        JSON.stringify({
          type: 'broadcast',
          data: {
            type: 'pull',
            data: { foo: 4 },
          },
        })
      );
    });

    this.socket.addEventListener('message', ({ data }) => {
      if (data && data.substr('push')) {
        const result = JSON.parse(data);
        if (result.type === 'push') {
          this.setState({
            examples: Object.entries(result.data),
          });
        }
        // console.log('Message from server ', data);
      }
    });
  }
  render() {
    const { examples } = this.state;

    return examples.length ? (
      <Fragment>
        {examples.map(([key, val]) => (
          <div
            key={key}
            style={{
              position: 'relative',
              border: '0 none',
              margin: 10,
              boxShadow: '1px 1px 5px rgba(0,0,0,0.3)',
              padding: 0,
              flex: 1,
              width: 'auto',
            }}
          >
            <Preview url={`http://localhost:1337/${key}.html`} />
          </div>
        ))}
      </Fragment>
    ) : (
      'loading...'
    );
  }
}

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
    <App />
  ),
  document.getElementById('root')
);
