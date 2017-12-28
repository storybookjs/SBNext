import React, { Component } from 'react';
import Router from 'next/router';

import { window } from 'global';

export default class extends Component {
  componentDidMount() {
    window.addEventListener('message', this.postMessageListener, false);
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener);
  }

  postMessageListener = ({ data }) => this.go(data);
  go(n) {
    Router.push(`/preview-${n}`);
  }

  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <button onClick={() => this.go(3)}>TEST</button>
      </div>
    );
  }
}
