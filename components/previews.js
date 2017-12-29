import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import styled from 'styled-jss';

import MoreHorizIcon from 'material-ui-icons/MoreVert';
import CloseIcon from 'material-ui-icons/Close';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: '0 none',
  boxSizing: 'border-box',
  // border: '1px solid rgba(0, 0, 0, 0.12)',
};

const zoomedIframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '200%',
  height: '200%',
  border: '0 none',
  transform: 'scale(0.5)',
  transformOrigin: 'top left',
};

const initialLayout = [
  { i: 'a', x: 0, y: 0, w: 6, h: 30 },
  { i: 'b', x: 6, y: 0, w: 18, h: 30 },
  { i: 'c', x: 0, y: 14, w: 24, h: 34 },
];

const Size = ({ children, id }) => (
  <div
    ref={id}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'rgba(0,0,0,0.03)',
      overflow: 'auto',
    }}
  >
    {children}
  </div>
);

const PointerOverlay = () => (
  <span
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      background: 'rgba(255,255,255,0.05)',
    }}
  />
);

const itemStyles = {
  // border: '1px solid white',
  borderTop: '32px solid white',
  // borderRadius: 2,
  boxSizing: 'border-box',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
};

class Toolbar extends Component {
  state = {
    menu: false,
    anchorEl: undefined,
  };
  menu = e => {
    this.setState({
      menu: !this.state.menu,
      anchorEl: e.target,
    });
  };

  render() {
    const { children } = this.props;
    const { menu, anchorEl } = this.state;
    const action = () => console.log('action');

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          top: -32,
          right: 0,
          left: 0,
          height: 32,
          boxSizing: 'border-box',
          padding: 4,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {children}
        <MoreHorizIcon onClick={e => this.menu(e)} />
        <Menu id="simple-menu" anchorEl={anchorEl} open={menu} onClose={this.menu}>
          <MenuItem onClick={action}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText inset primary="Close" />
          </MenuItem>
          <MenuItem onClick={action}>
            <ListItemIcon>
              <ZoomInIcon />
            </ListItemIcon>
            <ListItemText inset primary="Zoom" />
            <ListItemIcon>
              <ZoomOutIcon style={{ marginRight: 0, marginLeft: 16 }} />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

class Previews extends Component {
  state = {
    dragging: false,
  };
  setDragging(val) {
    this.setState({
      dragging: val,
    });
  }
  render() {
    const { width, height } = this.props.size;
    const { dragging } = this.state;

    return (
      <Size
        id={element => {
          this.element = element;
        }}
      >
        <style jsx global>
          {`
            body {
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
              bottom: 0px;
              right: 0px;
              background-position: bottom right;
              padding: 0 1px 1px 0;
              background-repeat: no-repeat;
              background-origin: content-box;
              background: transparent;
              box-sizing: border-box;
              cursor: se-resize;
            }
            .react-grid-layout {
              position: absolute;
              left: 0;
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

            .react-grid-item .react-resizable-handle {
              position: absolute;
              width: 20px;
              height: 20px;
              bottom: 0;
              right: 0;
              cursor: se-resize;
            }

            .react-grid-item .react-resizable-handle::after {
              content: '';
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

        <ReactGridLayout
          className="layout"
          layout={initialLayout}
          cols={24}
          rowHeight={10}
          preventCollision={false}
          width={width || 800}
          margin={[5, 5]}
          onDragStart={() => this.setDragging(true)}
          onDragStop={() => this.setDragging(false)}
          onResizeStart={() => this.setDragging(true)}
          onResizeStop={() => this.setDragging(false)}
        >
          <div
            className="react-grid-item react-draggable cssTransforms react-resizable"
            key="a"
            style={itemStyles}
          >
            {dragging ? <PointerOverlay /> : null}
            <Toolbar />
            <iframe src="/preview-1" style={iframeStyle} title="1" />
          </div>
          <div
            className="react-grid-item react-draggable cssTransforms react-resizable"
            key="b"
            style={itemStyles}
          >
            {dragging ? <PointerOverlay /> : null}
            <Toolbar />
            <iframe src="/preview-1" style={iframeStyle} title="2" />
          </div>
          <div
            className="react-grid-item react-draggable cssTransforms react-resizable"
            key="c"
            style={itemStyles}
          >
            {dragging ? <PointerOverlay /> : null}
            <Toolbar>(50%)</Toolbar>
            <iframe src="/preview-1" style={zoomedIframeStyle} title="3" />
          </div>
        </ReactGridLayout>
      </Size>
    );
  }
}

export default sizeMe({ monitorHeight: true })(Previews);
