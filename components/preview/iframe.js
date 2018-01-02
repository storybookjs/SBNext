import React, { Component, Fragment } from 'react';

import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import MoreHorizIcon from 'material-ui-icons/MoreVert';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';

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
    const { children, onZoomChange, menuItems } = this.props;
    const { menu, anchorEl } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: 32,
          boxSizing: 'border-box',
          padding: 4,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          background: '#fff',
          zIndex: 2,
        }}
      >
        {children}
        <MoreHorizIcon onClick={e => this.menu(e)} />
        <Menu id="simple-menu" anchorEl={anchorEl} open={menu} onClose={this.menu}>
          {menuItems}
          <MenuItem>
            <ListItemIcon onClick={() => onZoomChange(-0.25)}>
              <ZoomInIcon />
            </ListItemIcon>
            <ListItemText inset primary="Zoom" />
            <ListItemIcon onClick={() => onZoomChange(0.25)}>
              <ZoomOutIcon style={{ marginRight: 0, marginLeft: 16 }} />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const zoomedIframeStyle = {
  position: 'absolute',
  top: 32,
  left: 0,
  border: '0 none',
  transformOrigin: 'top left',
};

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

class Preview extends Component {
  state = {
    zoom: 1,
  };
  render() {
    const { id, isDragging, menuItems = [] } = this.props;
    const { zoom } = this.state;

    const zoomPercentage = `${100 * zoom}%`;

    const style = {
      ...zoomedIframeStyle,
      width: zoomPercentage,
      height: zoomPercentage,
      transform: `scale(${1 / zoom})`,
    };
    return (
      <Fragment>
        {isDragging ? <PointerOverlay /> : null}
        <Toolbar menuItems={menuItems} onZoomChange={val => this.setState({ zoom: zoom + val })}>
          <Typography type="body2" gutterBottom>
            ({parseFloat(100 / zoom).toFixed(0)}%)
          </Typography>
        </Toolbar>
        <iframe src="/preview-1" style={style} title={id} />
      </Fragment>
    );
  }
}

export default Preview;
