import React, { Component, Fragment } from 'react';

import Layout from '../components/drawer';
import Previews from '../components/previews';
import withRoot from '../components/withRoot';

class Index extends Component {
  static getInitialProps() {
    return {};
  }

  render() {
    return (
      <Fragment>
        <Layout head={null} main={<Previews />} />
      </Fragment>
    );
  }
}

export default withRoot(Index);
