import React, { Component } from 'react';
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
  }

  render() {
    return (
      <Size>
        <div style={{ padding: 20 }}>
          <Typography type="display2" gutterBottom>
            Component A
          </Typography>
          <MetaData />
          <div style={{ margin: '20px 0' }}>
            <Typography type="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Paper>
              <Preview absolute={false} />
            </Paper>
          </div>

          <div style={{ margin: '20px 0' }}>
            <Typography type="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Paper>
              <Preview absolute={false} />
            </Paper>
          </div>

          <div style={{ margin: '20px 0' }}>
            <Typography type="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Paper>
              <Preview absolute={false} />
            </Paper>
          </div>
        </div>
      </Size>
    );
  }
}

const DocPreview = sizeMe({ monitorHeight: true })(Previews);

export default DocPreview;
