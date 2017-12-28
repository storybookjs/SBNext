import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',  
  border: '3px solid pink',
  boxSizing: 'border-box',
}

class Previews extends Component {

  render() {
    
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 3, h: 14},
      {i: 'b', x: 3, y: 0, w: 9, h: 14},
      {i: 'c', x: 0, y: 14, w: 12, h: 12}
    ];
    return (      
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={867} margin={[0, 0]}>
        <div className="react-grid-item react-draggable cssTransforms react-resizable" key="a">
          <iframe src="/preview-1" style={iframeStyle} />
        </div>
        <div className="react-grid-item react-draggable cssTransforms react-resizable" key="b">
          <iframe src="/preview-1"  style={iframeStyle} />
        </div>
        <div className="react-grid-item react-draggable cssTransforms react-resizable" key="c">
          <iframe src="/preview-1"  style={iframeStyle} />
        </div>
      </ReactGridLayout>
    );
  }
};


export default Previews;
