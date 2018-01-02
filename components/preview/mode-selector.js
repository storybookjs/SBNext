import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ViewDayIcon from 'material-ui-icons/ViewDay';
import ViewQuiltIcon from 'material-ui-icons/ViewQuilt';
import FullscreenIcon from 'material-ui-icons/Fullscreen';

export const previewModes = {
  doc: {
    icon: <ViewDayIcon />,
    label: 'Documentation',
  },
  isolated: {
    icon: <FullscreenIcon />,
    label: 'Isolated',
  },
  multi: {
    icon: <ViewQuiltIcon />,
    label: 'Multi',
  },
};

const Item = ({ icon, action, label, handleClose }) => {
  const clickHandler = () => {
    handleClose();
    action();
  };
  if (icon) {
    return (
      <MenuItem onClick={clickHandler}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText inset primary={label} />
      </MenuItem>
    );
  }
  return <MenuItem onClick={clickHandler}>{label}</MenuItem>;
};

class SimpleMenu extends Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { items: list = [], selected } = this.props;
    const { open, anchorEl } = this.state;
    const items = list.map(item => <Item {...item} handleClose={() => this.handleClose()} />);

    return (
      <Fragment>
        <Button
          aria-owns={open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          raised
          color="default"
        >
          {previewModes[selected].icon}
          <span style={{ padding: '0 12px' }}>{selected}</span>
          <ExpandMoreIcon />
        </Button>
        <Menu id="preview-options-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          {items}
        </Menu>
      </Fragment>
    );
  }
}

export default SimpleMenu;
