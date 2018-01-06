import React from 'react';

import withDocs, { inCategory, sortByDate } from '@sb/serve/docs';

import DocListEntry from '../components/doc-list-entry';
import SBHello from '../components/sb-hello';
import Navigation from '../components/navigation';

const containsTag = tag => doc => {
  const tags = [].concat(doc.data.tag);
  return tags.indexOf(tag) != -1;
};

const unique = arr => [...new Set(arr)];

const Index = ({ docs }) => {
  const tags = unique(
    docs
      .filter(p => p.data.tag) // remove docs without tags
      .map(doc => [].concat(doc.data.tag)) // tags to array
      .reduce((c, p = []) => p.concat(...c)) // flatten array
      .sort()
  );

  return (
    <main style={styles.main}>
      <Navigation style={styles.navigation} />
      <SBHello title="Tags" />
      <section style={styles.section}>
        {tags.map(tag => {
          const inTag = docs.filter(containsTag(tag));

          return (
            <div key={`tag-${tag}`}>
              <h1>{tag}</h1>
              {inTag.map((doc, idx) => <DocListEntry key={`doc-${idx}`} {...doc} />)}
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default withDocs(Index);

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
  navigation: {
    position: 'absolute',
    alignSelf: 'center',
    width: '60vw',
  },
};
