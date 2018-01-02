import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

import { Size } from './index';
import Iframe from './iframe';

class Previews extends Component {
  state = {};

  render() {
    return (
      <Size>
        <Iframe toolbar={false} publisher={this.props.publisher} />
      </Size>
    );
  }
}

const IsolatePreview = sizeMe({ monitorHeight: true })(Previews);

export default IsolatePreview;
