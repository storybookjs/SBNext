import React, { Component, Fragment } from 'react';

import Layout from '../components/drawer';
import withRoot from '../components/withRoot';

class Index extends Component {
  static getInitialProps() {
    return {};
  }

  render() {
    return <Layout />;
  }
}

export default withRoot(Index);
