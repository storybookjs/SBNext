import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';

class Previews extends Component {

  render() {
    
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (<div>
      
      <style jsx>{`
      .iframe1 {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 300px;
        width: calc(40% - 300px);
        height: calc(100vh - 64px);
        margin: 0;
        border: 0 none;
        box-sizing: border-box;
        overflow: auto;
        box-shadow: inset 0 0 40vh rgba(0,0,0,0.2);
      }
      .iframe2 {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: calc(60% - 10px);
        height: calc(100vh - 64px);
        margin: 0;
        border: 0 none;
        box-sizing: border-box;
        overflow: auto;
        box-shadow: inset 0 0 40vh rgba(0,0,0,0.2);
      }
    `}</style>
<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <iframe src="/preview-1" className='iframe1' key="a" />
      <iframe src="/preview-1" className='iframe2' key="b" />
      </ReactGridLayout>
      </div>
    )
  }
};


export default Previews;
