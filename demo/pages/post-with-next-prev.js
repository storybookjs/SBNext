import React, { Component } from 'react';
import { withPostsFilterBy, inCategory } from '@sb/serve/posts';
import withPost, { Content } from '@sb/serve/post';
import Link from '@sb/serve/link';

import Navigation from '../components/navigation';

class Post extends Component {
  render() {
    const { post, posts } = this.props;
    const { data, content } = post;
    const tags = [].concat(data.tag);

    const currIdx = posts.findIndex(p => p.data.title == post.data.title);
    const prev = posts[currIdx - 1];
    const next = posts[currIdx + 1];

    return (
      <main style={styles.main}>
        <Navigation style={styles.navigation} />
        <article style={styles.article}>
          <h1>{data.title}</h1>

          {tags.length &&
            tags.map(tag => (
              <span style={styles.tag} key={`tag-${tag}`}>
                {' '}
                &gt; {tag}
              </span>
            ))}
          <Content {...post} />
          <footer>
            {prev && (
              <Link {...prev}>
                <a style={styles.prevLink}>
                  {' '}
                  <strong>&lt;</strong> Prev: {prev.data.title}
                </a>
              </Link>
            )}
            {next && (
              <Link {...next}>
                <a style={styles.nextLink}>
                  Next: {next.data.title} <strong>&gt;</strong>{' '}
                </a>
              </Link>
            )}
          </footer>
        </article>
      </main>
    );
  }
}

export default withPostsFilterBy(inCategory('post'))(withPost(Post));

const styles = {
  main: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  article: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '60vw',
    position: 'relative',
  },
  paragraph: {
    background: '#f5f5f5',
    padding: 20,
  },
  navigation: {
    alignSelf: 'center',
    width: '60vw',
  },
  tag: {
    display: 'inline',
    background: '#ccc',
    fontSize: '.75em',
    margin: 3,
    padding: 5,
  },
  nextLink: {
    position: 'absolute',
    right: 0,
  },
  prevLink: {},
};
