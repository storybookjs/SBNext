import React, { Component } from 'react';
import withPost, { Content } from '@sb/serve/post';

import Navigation from '../components/navigation';
import Tags from '../components/tags';

class Post extends Component {
  render() {
    const { post } = this.props;
    const { data, content } = post;
    const tags = data.tag ? [].concat(data.tag) : [];
    return (
      <main style={styles.main}>
        <Navigation style={styles.navigation} />
        <article style={styles.section}>
          <h1>{data.title}</h1>
          <Tags tags={tags} />
          <Content {...post} />
        </article>
      </main>
    );
  }
}

export default withPost(Post);

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
