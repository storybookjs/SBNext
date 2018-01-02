import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';

import AddIcon from 'material-ui-icons/Add';

import PreviewModeSelector, { previewModes } from './mode-selector';
import MultiPreview from './grid';
import DocsPreview from './doc';
import IsolatedPreview from './isolate';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';

export const Size = ({ children, id }) => (
  <div
    ref={id}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflow: 'auto',
    }}
  >
    {children}
  </div>
);

const getContent = type => {
  const listeners = [];
  const publisher = {
    listen: fn => listeners.push(fn),
    push: (...any) => listeners.forEach(fn => fn(...any)),
  };

  switch (type) {
    case 'doc': {
      return {
        options: [],
        Content: props => <DocsPreview {...{ ...props, publisher }} />,
      };
    }
    case 'isolated': {
      return {
        options: [
          <IconButton color="primary" onClick={() => publisher.push('zoom', 0.25)}>
            <ZoomOutIcon />
          </IconButton>,
          <IconButton color="primary" onClick={() => publisher.push('zoom', -0.25)}>
            <ZoomInIcon />
          </IconButton>,
        ],
        Content: props => <IsolatedPreview {...{ ...props, publisher }} />,
      };
    }
    default: {
      return {
        options: [
          <IconButton color="primary" onClick={() => publisher.push('add')}>
            <AddIcon />
          </IconButton>,
        ],
        Content: props => <MultiPreview {...{ ...props, publisher }} />,
      };
    }
  }
};

const Options = withStyles({
  root: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginLeft: 10,
    },
  },
})(({ children, classes }) => <div className={classes.root}>{children}</div>);

class Main extends Component {
  shouldComponentUpdate(nextProps) {
    const { props } = this;
    return props.previewMode !== nextProps.previewMode;
  }
  render() {
    const { previewMode, onSwitchPreviewMode } = this.props;
    const { Content, options } = getContent(previewMode);
    const items = Object.keys(previewModes).map(key => ({
      ...previewModes[key],
      action: () => onSwitchPreviewMode(key),
    }));

    return (
      <Size>
        <Content />
        <Options>
          {options}
          <PreviewModeSelector items={items} selected={previewMode} />
        </Options>
      </Size>
    );
  }
}

export default Main;
