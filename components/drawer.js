import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { document } from 'global';

import mouseTrap from 'react-mousetrap';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';

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

import Search from './search';
import Hierarchy from './hierarchy';
import Previews from '../components/previews';
import { Content as SettingsContent, Panel as SettingsPanel } from '../components/settings';

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
  appBarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
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
    width: 56,
    overflowX: 'hidden',
    overflowY: 'auto',
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
    display: 'flex',
    flexDirection: 'column',
  },
  drawerTop: {
    flex: 1,
  },
  drawerBottom: {},
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  main: {
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
  content: {
    position: 'absolute',
    top: 0,
    left: 300,
    bottom: 0,
    right: 0,
  },
  mypanel: {
    height: '100%',
    width: 300,
    overflow: 'auto',
    position: 'relative',
    zIndex: 1,
  },
});

const contents = {
  components: {
    content: ({ state, onSwitchPreviewMode }) => (
      <Previews previewMode={state.previewMode} {...{ onSwitchPreviewMode }} />
    ),
    panel: ({ go, onSwitchPreviewMode }) => <Hierarchy {...{ go, onSwitchPreviewMode }} />,
  },
  documentation: {
    content: () => <div>Documentation content</div>,
    panel: () => <div>Documentation is important</div>,
  },
  design: {
    content: () => <Previews />,
    panel: () => <div>Design is awesome</div>,
  },
  issues: {
    content: () => <Previews />,
    panel: () => <div>Issues are bad</div>,
  },
  settings: {
    content: () => <SettingsContent />,
    panel: () => <SettingsPanel />,
  },
  addon: {
    content: () => <Previews />,
    panel: () => <div>Addons are amazing</div>,
  },
};

class MiniDrawer extends Component {
  state = {
    open: false,
    previewMode: 'multi',
    ...contents.components,
  };

  componentDidMount() {
    this.props.bindShortcut(
      'command+,',
      e => {
        e.stopPropagation();
        e.preventDefault();
        this.handleAsideChange('settings');
      },
      'keydown'
    );
    this.props.bindShortcut(
      'command+1',
      e => {
        e.stopPropagation();
        e.preventDefault();
        this.handleAsideChange('components');
      },
      'keydown'
    );
    this.props.bindShortcut(
      'command+2',
      e => {
        e.stopPropagation();
        e.preventDefault();
        this.handleAsideChange('documentation');
      },
      'keydown'
    );
    this.props.bindShortcut(
      'command+3',
      e => {
        e.stopPropagation();
        e.preventDefault();
        this.handleAsideChange('design');
      },
      'keydown'
    );
    this.props.bindShortcut(
      'command+4',
      e => {
        e.stopPropagation();
        e.preventDefault();
        this.handleAsideChange('issues');
      },
      'keydown'
    );
  }

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
    this.setState(contents[val]);
  };

  onSwitchPreviewMode = val => {
    this.setState({
      previewMode: val,
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { panel, content } = this.state;

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
              <div className={classes.appBarContent}>
                <Typography type="title" color="inherit" noWrap>
                  Storybook
                </Typography>
                <Search />
              </div>
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
              <div className={classes.drawerTop}>
                <List className={classes.list}>
                  <ListItem button onClick={() => this.handleAsideChange('components')}>
                    <ListItemIcon>
                      <DeveloperBoardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Components" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleAsideChange('documentation')}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Documentation" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleAsideChange('design')}>
                    <ListItemIcon>
                      <BubbleChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Designs" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleAsideChange('issues')}>
                    <ListItemIcon>
                      <AnnouncementIcon />
                    </ListItemIcon>
                    <ListItemText primary="Issues" />
                  </ListItem>
                </List>
                <Divider />
                <List className={classes.list}>
                  <ListItem button onClick={() => this.handleAsideChange('addon')}>
                    <ListItemIcon>
                      <AddonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Panel addon 1" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleAsideChange('addon')}>
                    <ListItemIcon>
                      <AddonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Panel addon 2" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleAsideChange('addon')}>
                    <ListItemIcon>
                      <Badge badgeContent={4} color="primary">
                        <AddonIcon />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Panel addon 3" />
                  </ListItem>
                </List>
              </div>
              <div className={classes.drawerBottom}>
                <Divider />
                <ListItem button onClick={() => this.handleAsideChange('settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </div>
            </div>
          </Drawer>
          <main className={classes.main}>
            <Paper className={classes.mypanel} elevation={4}>
              {panel(this)}
            </Paper>
            <div className={classes.content}>{content(this)}</div>
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

export default mouseTrap(withStyles(styles, { withTheme: true })(MiniDrawer));
