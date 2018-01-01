import React, { Component } from 'react';
import Router from 'next/router';

import { window, document } from 'global';

export default class extends Component {
  componentDidMount() {
    window.addEventListener('message', (...any) => this.postMessageListener(...any), false);
    window.addEventListener('resize', (...any) => this.resizeListener(...any), false);

    this.resized();
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener);
  }

  resizeListener() {
    this.resized();
  }
  postMessageListener = ({ data: { go, size } }) => {
    if (go) {
      this.go(go);
    }

    if (size) {
      this.size();
    }
  };
  resized() {
    window.parent.postMessage(
      { size: document.documentElement.getBoundingClientRect() },
      document.location.origin
    );
  }
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
