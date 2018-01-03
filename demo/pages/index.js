import React from 'react';

import withPosts, { inCategory, sortByDate } from '@sb/serve/posts';

import PostListEntry from '../components/post-list-entry';
import SBHello from '../components/nextein-hello';
import Navigation from '../components/navigation';

const Index = ({ posts }) => {
  const inPosts = posts.filter(inCategory('post')).sort(sortByDate);
  const inHome = posts.filter(inCategory('home'));

  return (
    <main style={styles.main}>
      <Navigation style={styles.navigation} />
      <SBHello />
      <section style={styles.section}>
        <h1>/post</h1>
        <p>{inPosts.length} entries found.</p>
        {inPosts.map((post, idx) => <PostListEntry key={`post-${idx}`} {...post} />)}
      </section>
      <section style={styles.section}>
        <h1>/home</h1>
        <p>{inHome.length} entries found.</p>
        {inHome.map((post, idx) => <PostListEntry key={`home-${idx}`} {...post} />)}
      </section>
    </main>
  );
};

export default withPosts(Index);

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
