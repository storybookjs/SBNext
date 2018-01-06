import React from 'react';

import withDocs, { inCategory, sortByDate } from '@sb/serve/docs';

import DocListEntry from '../components/doc-list-entry';
import SBHello from '../components/sb-hello';
import Navigation from '../components/navigation';

const Index = ({ docs }) => {
  docs.sort(sortByDate);

  return (
    <main style={styles.main}>
      <Navigation style={styles.navigation} />
      <SBHello title="All Docs" />
      <section style={styles.section}>
        {docs.map((doc, idx) => <DocListEntry key={`doc-${idx}`} {...doc} />)}
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
