import React, { Component } from 'react';
import Router from 'next/router';

import { window, document, PerformanceObserver } from 'global';

export default class extends Component {
  componentDidMount() {
    this.resizeListener = () => {
      window.parent.postMessage(
        { size: document.documentElement.getBoundingClientRect() },
        document.location.origin
      );
    };
    this.postMessageListener = ({ data: { go, size } }) => {
      if (go) {
        this.go(go);
      }

      if (size) {
        this.resizeListener();
      }
    };

    window.addEventListener('message', this.postMessageListener, false);

    // listen for changes that might change the size of the window
    window.addEventListener('resize', this.resizeListener, false);
    window.addEventListener('scroll', this.resizeListener, false);

    this.performanceObserver = new PerformanceObserver(list => {
      if (list.getEntries().find(item => item.initiatorType.match(/(css|img)/))) {
        this.resizeListener();
      }
    });
    this.performanceObserver.observe({ entryTypes: ['resource'] });

    // pass the rendered window size up to parent
    this.resizeListener();
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener);
    window.removeEventListener('resize', this.resizeListener, false);
    window.removeEventListener('scroll', this.resizeListener, false);
    this.performanceObserver.disconnect();
  }
  go(n) {
    Router.push(`/preview-${n}`);
  }

  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <button onClick={() => this.go(2)}>TEST</button>
      </div>
    );
  }
}
