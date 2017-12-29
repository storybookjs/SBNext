import React from 'react';
import PropTypes from 'prop-types';
import { document } from 'global';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import SettingsIcon from 'material-ui-icons/Settings';
import DeveloperBoardIcon from 'material-ui-icons/DeveloperBoard';
import DescriptionIcon from 'material-ui-icons/Description';
import BubbleChartIcon from 'material-ui-icons/BubbleChart';
import AnnouncementIcon from 'material-ui-icons/Announcement';
import AddonIcon from 'material-ui-icons/ChromeReaderMode';

import Hierarchy from './hierarchy';

import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
    height: '100%',
    boxSizing: 'border-box',
    paddingBottom: 50,
  },
  settings: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    position: 'relative',
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  mypanel: {
    height: '100%',
    width: 300,
    overflow: 'auto',
    position: 'relative',
    zIndex: 1,
  },
});

const asides = {
  components: ({ go }) => <Hierarchy go={target => go(target)} />,
  documentation: () => <div>Documentation is important</div>,
  design: () => <div>Design is awesome</div>,
  issues: () => <div>Issues are bad</div>,
  settings: () => <div>Settings are required</div>,
  addon: () => <div>Addons are amazing</div>,
};

class MiniDrawer extends React.Component {
  state = {
    open: false,
    aside: asides.components(this),
  };

  go(id) {
    [...document.getElementsByTagName('iframe')]
      .map(el => el.contentWindow)
      .forEach(frame => frame.postMessage(id, document.location.origin));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleAsideChange = val => {
    this.setState({ aside: asides[val](this) });
  };

  render() {
    const { classes, theme, head, main } = this.props;
    const { aside } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Storybook
              </Typography>
              {head}
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List className={classes.list}>
                <ListItem button onClick={e => this.handleAsideChange('components')}>
                  <ListItemIcon>
                    <DeveloperBoardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Components" />
                </ListItem>
                <ListItem button onClick={e => this.handleAsideChange('documentation')}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Documentation" />
                </ListItem>
                <ListItem button onClick={e => this.handleAsideChange('design')}>
                  <ListItemIcon>
                    <BubbleChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Designs" />
                </ListItem>
                <ListItem button onClick={e => this.handleAsideChange('issues')}>
                  <ListItemIcon>
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Issues" />
                </ListItem>
              </List>
              <Divider />
              <List className={classes.list}>
                <ListItem button onClick={e => this.handleAsideChange('addon')}>
                  <ListItemIcon>
                    <AddonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Panel addon 1" />
                </ListItem>
                <ListItem button onClick={e => this.handleAsideChange('addon')}>
                  <ListItemIcon>
                    <AddonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Panel addon 2" />
                </ListItem>
                <ListItem button onClick={e => this.handleAsideChange('addon')}>
                  <ListItemIcon>
                    <AddonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Panel addon 3" />
                </ListItem>
              </List>
              <div className={classes.settings}>
                <Divider />
                <ListItem button onClick={e => this.handleAsideChange('settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </div>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Paper className={classes.mypanel} elevation={4}>
              {aside}
            </Paper>
            {main}
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
