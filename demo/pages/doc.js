import React, { Component } from 'react';
import withDoc, { Content } from '@sb/serve/doc';

import Navigation from '../components/navigation';
import Tags from '../components/tags';

class Doc extends Component {
  render() {
    const { doc } = this.props;
    const { data, content } = doc;
    const tags = data.tag ? [].concat(data.tag) : [];
    return (
      <main style={styles.main}>
        <Navigation style={styles.navigation} />
        <article style={styles.section}>
          <h1>{data.title}</h1>
          <Tags tags={tags} />
          <Content {...doc} />
        </article>
      </main>
    );
  }
}

export default withDoc(Doc);

const styles = {
  main: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '60vw',
  },
  paragraph: {
    background: '#f5f5f5',
    padding: 20,
  },
  navigation: {
    alignSelf: 'center',
    width: '60vw',
  },
};
