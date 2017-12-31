import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import AddIcon from 'material-ui-icons/Add';
import DashboardIcon from 'material-ui-icons/Dashboard';

const Item = ({ icon, action, label, handleClose }) => {
  if (icon) {
    return (
      <MenuItem onClick={e => handleClose(e) && action(e)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText inset primary={label} />
      </MenuItem>
    );
  }
  return <MenuItem onClick={e => handleClose(e) && action(e)}>{label}</MenuItem>;
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
    const { items: list = [], children } = this.props;
    const { open, anchorEl } = this.state;
    const items = list.map(item => <Item {...item} handleClose={() => this.handleClose} />);

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {children}
        </Button>
        <Menu id="preview-options-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          {items}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
