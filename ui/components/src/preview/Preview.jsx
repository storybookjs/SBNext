import React, { Component, Fragment } from 'react';
import glamorous from 'glamorous';
import { window } from 'global';

import PointerOverlay from './PointerOverlay.jsx';
import Toolbar from './Toolbar.jsx';

const Typography = glamorous.div({
  fontSize: 11,
  lineHeight: '32px',
  marginRight: 5,
  borderRight: '1px solid rgba(0,0,0,0.2)',
  paddingRight: 10,
});

const defaults = {
  grid: {
    backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
    backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',

    backgroundImage: `
    linear-gradient(rgba(0,0,0,0.05) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 2px, transparent 2px),
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
  },
  background: {
    backgroundColor: 'transparent',
  },
};

const Frame = glamorous.iframe(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    border: '0 none',
    overflow: 'hidden',
  },
  ({ grid = defaults.grid }) => grid,
  ({ background = defaults.background }) => background,
  ({ zoom }) => ({
    width: `${100 * zoom}%`,
    height: `${100 * zoom}%`,
    transform: `scale(${1 / zoom})`,
    transition: 'transform .2s ease-out, height .2s ease-out, width .2s ease-out',
    transformOrigin: 'top left',
  })
);

const FrameWrap = glamorous.div(({ height }) => ({
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  right: 0,
  bottom: 0,
  top: height,
  height: `calc(100% - ${height}px)`,
}));

const WrapperA = ({ children, height, zoom, getRef }) => (
  <div
    ref={getRef}
    style={{
      position: 'relative',
      height: 32 + height / zoom,
      overflow: 'hidden',
      transition: 'height .2s ease-out',
    }}
  >
    {children}
  </div>
);

class Iframe extends Component {
  state = {
    zoom: 1,
    height: 0,
  };

  componentDidMount() {
    this.postMessageListener = ({ source, data: { size } }) => {
      if (size && this.elements.iframe && this.elements.iframe.contentWindow === source) {
        this.setState({ height: size.height });
      }
    };

    window.addEventListener('message', this.postMessageListener, false);
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.postMessageListener);
  }

  elements = {};

  registerPreview(element) {
    if (window && element) {
      this.elements = {
        container: element,
        iframe: element.querySelector('iframe'),
      };
    }
  }

  render() {
    const {
      id,
      isDragging,
      absolute = true,
      toolbar = true,
      url = 'https://example.com',
    } = this.props;

    const { zoom, height } = this.state;

    const Wrapper = absolute ? Fragment : WrapperA;
    const toolbarHeight = toolbar ? 32 : 0;

    return (
      <Wrapper getRef={element => this.registerPreview(element)} {...{ zoom, height }}>
        {isDragging ? <PointerOverlay /> : null}
        {toolbar ? (
          <Toolbar onZoomChange={val => this.setState({ zoom: zoom * val })}>
            <Typography>({parseFloat(100 / zoom).toFixed(0)}%)</Typography>
          </Toolbar>
        ) : null}
        <FrameWrap height={toolbarHeight}>
          <Frame src={url} title={id} {...{ zoom }} />
        </FrameWrap>
      </Wrapper>
    );
  }
}

export default Iframe;
