import React, { Component, Fragment } from 'react';

import { document } from 'global';

import Layout from '../components/drawer';
import Hierarchy from '../components/hierarchy';
import Previews from '../components/previews';
import withRoot from '../components/withRoot';

class Index extends Component {
  static getInitialProps() {
    return {};
  }

  go(id) {
    [...document.getElementsByTagName('iframe')]
      .map(el => el.contentWindow)
      .forEach(frame => frame.postMessage(id, 'http://localhost:1337'));
  }

  render() {
    return (
      <Fragment>
        <Layout
          head={null}
          aside={<Hierarchy go={target => this.go(target)} />}
          main={<Previews />}
        />
        <style>
          {`body {
            padding: 0;
            margin: 0;
            overflow: hidden;
          }
          .react-resizable {
            position: relative;
          }
          .react-resizable-handle {
            position: absolute;
            width: 20px;
            height: 20px;
            bottom: 0;
            right: 0;
            background: orangered;
            background-position: bottom right;
            padding: 0 3px 3px 0;
            background-repeat: no-repeat;
            background-origin: content-box;
            box-sizing: border-box;
            cursor: se-resize;
          }
          .react-grid-layout {
            position: absolute;
            left: 300px;
            top: 0;
            bottom: 0;
            height: 100%;
            right: 0;
          }
          .react-grid-item {
            transition: all 200ms ease;
            transition-property: left, top;
          }
          .react-grid-item.cssTransforms {
            transition-property: transform;
          }
          .react-grid-item.resizing {
            z-index: 1;
            will-change: width, height;
          }
          
          .react-grid-item.react-draggable-dragging {
            transition: none;
            z-index: 3;
            will-change: transform;
          }
          
          .react-grid-item.react-grid-placeholder {
            background: red;
            opacity: 0.2;
            transition-duration: 100ms;
            z-index: 2;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
          }
          
          .react-grid-item > .react-resizable-handle {
            position: absolute;
            width: 20px;
            height: 20px;
            bottom: 0;
            right: 0;
            cursor: se-resize;
          }
          
          .react-grid-item > .react-resizable-handle::after {
            content: "";
            position: absolute;
            right: 3px;
            bottom: 3px;
            width: 5px;
            height: 5px;
            border-right: 2px solid rgba(0, 0, 0, 0.4);
            border-bottom: 2px solid rgba(0, 0, 0, 0.4);
          }
          `}
        </style>
      </Fragment>
    );
  }
}

export default withRoot(Index);
