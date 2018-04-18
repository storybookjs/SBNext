import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import GoldenLayout from '@ndelangen/golden-layout';
import { window } from 'global';

const TestComponent = ({ label }) => <h1>{label}</h1>;

const initial = {
  settings: {
    hasHeaders: true,
    constrainDragToContainer: true,
    reorderEnabled: true,
    selectionEnabled: false,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: true,
    showMaximiseIcon: true,
    showCloseIcon: true,
  },
  dimensions: {
    borderWidth: 5,
    minItemHeight: 10,
    minItemWidth: 10,
    headerHeight: 30,
    dragProxyWidth: 200,
    dragProxyHeight: 200,
  },
  labels: {
    close: 'close',
    maximise: 'maximise',
    minimise: 'minimise',
    popout: 'open in new window',
  },
  content: [
    {
      type: 'row',
      content: [
        {
          type: 'react-component',
          component: 'test-component',
          props: { label: 'A' },
        },
        {
          type: 'column',
          content: [
            {
              type: 'react-component',
              component: 'test-component',
              props: { label: 'B' },
            },
            {
              type: 'react-component',
              component: 'test-component',
              props: { label: 'C' },
            },
          ],
        },
      ],
    },
  ],
};

class Content extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) => null; // TODO
  constructor(props) {
    super(props);
    this.state = {};
    this.element = React.createRef();
  }
  componentDidMount() {
    const { element } = this;

    setTimeout(() => {
      this.layout = new GoldenLayout(initial, element.current);
      this.resizeListener = () => {
        console.log('resized');
        this.layout.updateSize();
      };

      this.layout.registerComponent('test-component', TestComponent);
      this.layout.init();
    }, 0);

    window.addEventListener('resize', this.resizeListener);
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    this.layout = null;
    this.resizeListener = null;
  }
  render() {
    return <div ref={this.element} style={{ height: '100%', width: '100%' }} />;
  }
}

export default Content;
