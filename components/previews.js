import React, { Component, Fragment } from 'react';
import ReactGridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import MoreHorizIcon from 'material-ui-icons/MoreVert';
import CloseIcon from 'material-ui-icons/Close';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';
import AddIcon from 'material-ui-icons/Add';
import DashboardIcon from 'material-ui-icons/Dashboard';
import FullscreenIcon from 'material-ui-icons/Fullscreen';

const zoomedIframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  border: '0 none',
  transformOrigin: 'top left',
};

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

class Preview extends Component {
  state = {
    zoom: 1,
  };
  render() {
    const { id, isDragging, onRemove } = this.props;
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
        <Toolbar
          onRemove={() => onRemove(id)}
          onZoomChange={val => this.setState({ zoom: zoom + val })}
        >
          <Typography type="body2" gutterBottom>
            ({parseFloat(100 / zoom).toFixed(0)}%)
          </Typography>
        </Toolbar>
        <iframe src="/preview-1" style={style} title={id} />
      </Fragment>
    );
  }
}
const itemStyles = {
  borderTop: '32px solid white',
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
    const { children, onZoomChange, onRemove } = this.props;
    const { menu, anchorEl } = this.state;

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
          <MenuItem onClick={onRemove}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText inset primary="Close" />
          </MenuItem>
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

class Previews extends Component {
  state = {
    dragging: false,
    items: [
      { i: '1', x: 0, y: 0, w: 6, h: 30 },
      { i: '2', x: 6, y: 0, w: 18, h: 30 },
      { i: '3', x: 0, y: 14, w: 24, h: 34 },
    ],
  };
  componentDidMount() {
    this.props.publisher.listen(data => {
      if (data === 'add') {
        this.add();
      }
    });
  }
  setDragging(val) {
    this.setState({
      dragging: val,
    });
  }
  remove(id) {
    this.setState({
      items: this.state.items.filter(({ i }) => i !== id),
    });
  }
  add() {
    const id =
      this.state.items.reduce((acc, { i }) => (acc > parseInt(i, 10) ? acc : parseInt(i, 10)), 0) +
      1;
    this.setState({
      items: this.state.items.concat({ i: id, x: 0, y: 0, w: 6, h: 40 }),
    });
  }
  render() {
    const { width, height } = this.props.size;
    const { dragging, items } = this.state;

    return (
      <Size>
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
          {items.map(({ i, ...data }) => (
            <div
              className="react-grid-item react-draggable cssTransforms react-resizable"
              key={i}
              data-grid={data}
              style={itemStyles}
            >
              <Preview id={i} isDragging={dragging} onRemove={() => this.remove(i)} />
            </div>
          ))}
        </ReactGridLayout>
      </Size>
    );
  }
}

const MultiPreview = sizeMe({ monitorHeight: true })(Previews);

const getContent = type => {
  const listeners = [];
  const publisher = {
    listen: fn => listeners.push(fn),
    push: data => listeners.forEach(fn => fn(data)),
  };

  switch (type) {
    case 'doc': {
      return {
        options: [],
        Content: () => <div>TODO: build this type of preview</div>,
      };
    }
    case 'isolated': {
      return {
        options: [],
        Content: () => <div>TODO: build this type of preview</div>,
      };
    }
    default: {
      return {
        options: [
          <Button onClick={() => publisher.push('add')} fab color="primary" aria-label="add">
            <AddIcon />
          </Button>,
        ],
        Content: props => <MultiPreview {...{ ...props, publisher }} />,
      };
    }
  }
};

const Options = ({ children }) => (
  <div style={{ position: 'fixed', right: 20, bottom: 20 }}>{children}</div>
);

const Main = ({ previewMode, onSwitchPreviewMode }) => {
  const { Content, options } = getContent(previewMode);

  return (
    <Size>
      <Content />
      <Options {...{ onSwitchPreviewMode }}>
        <Button onClick={() => onSwitchPreviewMode('doc')} fab color="primary" aria-label="add">
          <AddIcon />
        </Button>
        <Button onClick={() => onSwitchPreviewMode('multi')} fab color="primary" aria-label="add">
          <DashboardIcon />
        </Button>
        {options}
      </Options>
    </Size>
  );
};

export default Main;
