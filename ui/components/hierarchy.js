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
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

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
  };

  open = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, docs, sub = [], name, go } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ListItem button onClick={this.open}>
          <ListItemText primary={name} />
          <ExpandMoreIcon />
        </ListItem>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding dense>
            {sub.map((item, index) => (
              <NestedListItem
                key={index}
                name={item.name}
                docs={item.docs}
                sub={item.sub}
                {...{ classes, go }}
              />
            ))}
            {docs.map((item, index) => (
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
      <NestedListItem docs={['1', '2', '3']} name="Component 1" {...{ classes, go }} />
      <NestedListItem docs={['1', '2', '3']} name="Component 2" {...{ classes, go }} />
      <NestedListItem docs={['1', '2', '3']} name="Component 3" {...{ classes, go }} />
    </List>
    <Divider />
    <List className={classes.root} subheader={<ListSubheader>Root Category 2</ListSubheader>}>
      <NestedListItem docs={['1', '2', '3']} name="Component 4" {...{ classes, go }} />
      <NestedListItem
        docs={['1', '2', '3']}
        sub={[
          { docs: ['1', '2', '3'], name: 'Component 6' },
          { docs: ['1', '2', '3'], name: 'Component 7' },
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
