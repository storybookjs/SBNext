import React, { Component } from 'react';
import Button from 'material-ui/Button';

import AddIcon from 'material-ui-icons/Add';
import DashboardIcon from 'material-ui-icons/Dashboard';

import PreviewModeSelector from './mode-selector';
import MultiPreview from './grid';

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
  <div style={{ position: 'fixed', right: 20, bottom: 20, display: 'flex' }}>{children}</div>
);

class Main extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;
    return props.previewMode !== nextProps.previewMode;
  }
  render() {
    const { previewMode, onSwitchPreviewMode } = this.props;
    const { Content, options } = getContent(previewMode);

    const previewModes = [
      {
        icon: <AddIcon />,
        label: 'Option 1',
        action: () => onSwitchPreviewMode('doc'),
      },
      {
        icon: <DashboardIcon />,
        label: 'Option 2',
        action: () => onSwitchPreviewMode('multi'),
      },
    ];

    return (
      <Size>
        <Content />
        <Options>
          <PreviewModeSelector items={previewModes}>choose preview mode</PreviewModeSelector>
          {options}
        </Options>
      </Size>
    );
  }
}

export default Main;
