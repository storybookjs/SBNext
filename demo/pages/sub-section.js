import React from 'react';

import withPosts, { inCategory, sortByDate } from '@sb/serve/posts';

import PostListEntry from '../components/post-list-entry';
import SBHello from '../components/@sb/serve-hello';
import Navigation from '../components/navigation';

const Index = ({ posts }) => {
  posts.sort(sortByDate);
  const subCategoryPosts = posts.filter(inCategory('sub-section', { includeSubCategories: true }));

  return (
    <main style={styles.main}>
      <Navigation style={styles.navigation} />
      <SBHello title="Sub Section" />
      <section style={styles.section}>
        {subCategoryPosts.map(post => <PostListEntry key={post.data.url} {...post} />)}
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
