import React, { Component } from 'react';
import { window, document } from 'global';
import sizeMe from 'react-sizeme';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { Size } from './index';
import MetaData from './metadata';
import Preview from './iframe';

class Previews extends Component {
  state = {};

  componentDidMount() {
    this.props.publisher.listen(data => {
      console.log(data);
    });

    window.addEventListener('message', (...any) => this.postMessageListener(...any), false);

    [...document.getElementsByTagName('iframe')]
      .map(el => el.contentWindow)
      .forEach(frame => frame.postMessage({ size: true }, document.location.origin));
  }
  componentWillUnmount() {
    window.removeEventListener('message', (...any) => this.postMessageListener(...any));
  }

  previews = {};

  postMessageListener({ source, data: { size } }) {
    if (size) {
      const sourceKey = Object.keys(this.previews).find(
        key => this.previews[key].iframe.contentWindow === source
      );

      if (sourceKey) {
        this.previews[sourceKey].element.style.height = `${size.height + 33}px`;
      }
    }
  }
  registerPreview(id, element) {
    if (window && element) {
      this.previews = {
        ...this.previews,
        [id]: {
          element: element.firstElementChild,
          iframe: element.querySelector('iframe'),
        },
      };
    }
  }

  render() {
    return (
      <Size>
        <div style={{ padding: 20 }}>
          <Typography type="display2" gutterBottom>
            Component A
          </Typography>
          <MetaData />
          <div ref={element => this.registerPreview(1, element)} style={{ margin: '20px 0' }}>
            <Paper
              style={{
                position: 'relative',
                height: 32,
                overflow: 'hidden',
                transition: 'height .3s ease-out',
              }}
            >
              <Preview />
            </Paper>
          </div>
          <div ref={element => this.registerPreview(2, element)} style={{ margin: '20px 0' }}>
            <Paper
              style={{
                position: 'relative',
                height: 32,
                overflow: 'hidden',
                transition: 'height .3s ease-out',
              }}
            >
              <Preview />
            </Paper>
          </div>
          <div ref={element => this.registerPreview(3, element)} style={{ margin: '20px 0' }}>
            <Paper
              style={{
                position: 'relative',
                height: 32,
                overflow: 'hidden',
                transition: 'height .3s ease-out',
              }}
            >
              <Preview />
            </Paper>
          </div>
        </div>
      </Size>
    );
  }
}

const DocPreview = sizeMe({ monitorHeight: true })(Previews);

export default DocPreview;
