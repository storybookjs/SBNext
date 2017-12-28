import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Menu, { MenuItem } from 'material-ui/Menu';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';

import DashboardIcon from 'material-ui-icons/Dashboard';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

// It's already recursive, but it needs recursive styling (padding)
const NestedListSubItem = ({ name, classes, go }) => (
  <ListItem button className={classes.nested} onClick={() => go(name)}>
    <ListItemText primary={name} />
  </ListItem>
);

class NestedListItem extends React.Component {
  static defaultProps: {
    name: 'Unnamed Component',
    items: ['story 1', 'story 2', 'story 3', 'story 4'],
  };
  state = {
    open: false,
    menu: false,
  };

  open = () => {
    this.setState({ open: !this.state.open });
  };
  menu = e => {
    this.setState({
      menu: !this.state.menu,
      anchorEl: e.target,
    });
  };

  render() {
    const { classes, stories, sub = [], name, go } = this.props;
    const { open, menu, anchorEl } = this.state;

    const action = (e, ...params) => {
      console.log('action', ...params);
      this.menu(e);
    };

    return (
      <Fragment>
        <ListItem button onClick={this.open}>
          <ListItemText primary={name} />
          <MoreVertIcon onClick={e => e.stopPropagation() || this.menu(e)} />
        </ListItem>
        <Menu id="simple-menu" anchorEl={anchorEl} open={menu} onClose={this.menu}>
          <MenuItem onClick={action}>
            <ListItemIcon className={classes.icon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText inset primary="View all" />
          </MenuItem>
          <MenuItem onClick={action}>
            <ListItemIcon className={classes.icon}>
              <FullscreenIcon />
            </ListItemIcon>
            <ListItemText inset primary="Isolation" />
          </MenuItem>
        </Menu>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding dense>
            {sub.map((item, index) => (
              <NestedListItem
                key={index}
                name={item.name}
                stories={item.stories}
                sub={item.sub}
                {...{ classes, go }}
              />
            ))}
            {stories.map((item, index) => (
              <NestedListSubItem key={index} name={item} {...{ classes, go }} />
            ))}
          </List>
        </Collapse>
      </Fragment>
    );
  }
}

const NestedList = ({ classes, go }) => (
  <Fragment>
    <List className={classes.root} subheader={<ListSubheader>Root Category 1</ListSubheader>}>
      <NestedListItem stories={['1', '2', '3']} name="Component 1" {...{ classes, go }} />
      <NestedListItem stories={['1', '2', '3']} name="Component 2" {...{ classes, go }} />
      <NestedListItem stories={['1', '2', '3']} name="Component 3" {...{ classes, go }} />
    </List>
    <Divider />
    <List className={classes.root} subheader={<ListSubheader>Root Category 2</ListSubheader>}>
      <NestedListItem stories={['1', '2', '3']} name="Component 4" {...{ classes, go }} />
      <NestedListItem
        stories={['1', '2', '3']}
        sub={[
          { stories: ['1', '2', '3'], name: 'Component 6' },
          { stories: ['1', '2', '3'], name: 'Component 7' },
        ]}
        name="Component 5"
        {...{ classes, go }}
      />
    </List>
  </Fragment>
);

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  go: PropTypes.func.isRequired,
};

export default withStyles(styles)(NestedList);
