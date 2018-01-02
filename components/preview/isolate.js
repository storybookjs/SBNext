import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

import { Size } from './index';
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
        <Preview toolbar={false} publisher={this.props.publisher} />
      </Size>
    );
  }
}

const IsolatePreview = sizeMe({ monitorHeight: true })(Previews);

export default IsolatePreview;
