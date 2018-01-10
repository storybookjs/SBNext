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
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

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
    name: 'Unnamed Page',
    sections: [],
  };
  state = {
    open: false,
  };

  open = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, sections = [], sub = [], name, go } = this.props;
    const { open } = this.state;

    const action = e => {
      this.menu(e);
    };

    return (
      <Fragment>
        <ListItem button onClick={() => this.setState({ open: !this.state.open })}>
          <ListItemText primary={name} />
          <ChevronRightIcon />
        </ListItem>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding dense>
            {sections.map((item, index) => (
              <NestedListSubItem key={index} name={item} {...{ classes, go }} />
            ))}
            {sub.map((item, index) => (
              <NestedListItem
                key={index}
                name={item.name}
                sections={item.sections}
                sub={item.sub}
                {...{ classes, go }}
              />
            ))}
          </List>
        </Collapse>
      </Fragment>
    );
  }
}

const DocsTree = ({ classes, go }) => (
  <Fragment>
    <List className={classes.root} subheader={<ListSubheader>Root Category 1</ListSubheader>}>
      <NestedListItem
        name="Intro into this project"
        sections={['intro', 'section A', 'Section B']}
        {...{ classes, go }}
      />
      <NestedListItem
        name="Installation"
        sections={['intro', 'section A', 'Section B']}
        {...{ classes, go }}
      />
      <NestedListItem
        name="Important links"
        sections={['intro', 'section A', 'Section B']}
        {...{ classes, go }}
      />
      <NestedListItem
        name="Page 4 (has sub)"
        sections={['intro', 'section A', 'Section B']}
        sub={[
          { docs: ['intro', 'section A', 'Section B'], name: 'Page 5' },
          { docs: ['intro', 'section A', 'Section B'], name: 'Page 6' },
        ]}
        {...{ classes, go }}
      />
      <NestedListItem sections={[]} name="Page 7" {...{ classes, go }} />
      <NestedListItem sections={[]} name="Page 8" {...{ classes, go }} />
    </List>
    <Divider />
    <List className={classes.root} subheader={<ListSubheader>Root Category 2</ListSubheader>}>
      <NestedListItem sections={[]} name="Page 9" {...{ classes, go }} />
      <NestedListItem sections={[]} name="Page 10" {...{ classes, go }} />
      <NestedListItem sections={[]} name="Page 11" {...{ classes, go }} />
      <NestedListItem sections={[]} name="Page 12" {...{ classes, go }} />
      <NestedListItem sections={[]} name="Page 13" {...{ classes, go }} />
    </List>
    <Divider />
    <List className={classes.root} subheader={<ListSubheader>Root Category 3</ListSubheader>}>
      <NestedListItem
        sections={['intro', 'section A', 'Section B']}
        name="Page 14"
        {...{ classes, go }}
      />
      <NestedListItem
        name="Page 15"
        sections={['intro', 'section A', 'Section B']}
        sub={[
          { docs: ['intro', 'section A', 'Section B'], name: 'Page 6' },
          { docs: ['intro', 'section A', 'Section B'], name: 'Page 7' },
        ]}
        {...{ classes, go }}
      />
    </List>
  </Fragment>
);

DocsTree.propTypes = {
  classes: PropTypes.object.isRequired,
  go: PropTypes.func.isRequired,
};

export default withStyles(styles)(DocsTree);
