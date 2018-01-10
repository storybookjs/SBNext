import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';

import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import CloseIcon from 'material-ui-icons/Close';

import Iframe from './iframe';
import { Size } from './index';

const itemStyles = {
  boxSizing: 'border-box',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
};

class GridPreview extends Component {
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
        <style>
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
              <Iframe
                id={i}
                isDragging={dragging}
                menuItems={[
                  <IconButton
                    key="remove"
                    onClick={() => this.remove(i)}
                    style={{ width: 30, height: 30 }}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </div>
          ))}
        </ReactGridLayout>
      </Size>
    );
  }
}

const MultiPreview = sizeMe({ monitorHeight: true })(GridPreview);

export default MultiPreview;
