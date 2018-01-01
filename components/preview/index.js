import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';

import AddIcon from 'material-ui-icons/Add';

import PreviewModeSelector, { previewModes } from './mode-selector';
import MultiPreview from './grid';
import DocsPreview from './doc';

export const Size = ({ children, id }) => (
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
        Content: props => <DocsPreview {...{ ...props, publisher }} />,
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
      marginLeft: 20,
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
