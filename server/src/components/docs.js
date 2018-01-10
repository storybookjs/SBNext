import React, { Component } from 'react';

import loadEntries from '../entries/load';

export const entries = loadEntries;

export const withDocsFilterBy = filter => WrappedComponent =>
  class extends Component {
    static async getInitialProps(...args) {
      const wrappedInitial = WrappedComponent.getInitialProps;
      const wrapped = wrappedInitial ? await wrappedInitial(...args) : {};
      const all = await loadEntries();
      const docs = filter ? all.filter(filter) : all;

      return {
        ...wrapped,
        docs,
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const withDocs = withDocsFilterBy();

export default withDocs;
