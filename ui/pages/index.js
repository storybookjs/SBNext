import React, { Component } from 'react';

import MainLayout from '../components/main-layout';
import withRoot from '../components/withRoot';

class Index extends Component {
  static getInitialProps() {
    return {};
  }

  render() {
    return <MainLayout {...this.props} />;
  }
}

export default withRoot(Index);
