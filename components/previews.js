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
      left: 300,
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
  // border: '3px solid white',
  borderTop: '32px solid white',
  // borderRadius: 4,
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
