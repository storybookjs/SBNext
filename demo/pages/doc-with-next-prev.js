import React, { Component } from 'react';
import { withDocsFilterBy, inCategory } from '@sb/serve/docs';
import withDoc, { Content } from '@sb/serve/doc';
import Link from '@sb/serve/link';

import Navigation from '../components/navigation';

class Doc extends Component {
  render() {
    const { doc, docs } = this.props;
    const { data, content } = doc;
    const tags = [].concat(data.tag);

    const currIdx = docs.findIndex(p => p.data.title == doc.data.title);
    const prev = docs[currIdx - 1];
    const next = docs[currIdx + 1];

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
          <Content {...doc} />
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

export default withDocsFilterBy(inCategory('doc'))(withDoc(Doc));

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
