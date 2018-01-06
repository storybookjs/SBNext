import React from 'react';
import Link from '@sb/serve/link';

const Navigation = ({ style }) => (
  <nav style={{ ...styles.nav, ...style }}>
    <Link href="/">
      <a style={styles.item}>Home</a>
    </Link>
    <Link href="/all-docs">
      <a style={styles.item}>All Docs</a>
    </Link>
    <Link href="/sub-section">
      <a style={styles.item}>Sub Section</a>
    </Link>
    {/* <a style={styles.item} href="/">Home</a>
      <a style={styles.item} href="/all-docs">All Docs</a>
      <a style={styles.item} href="/sub-section">Sub Section</a> */}
    <Link href="/tags">
      <a style={styles.item}>Tags</a>
    </Link>
    {/* <a style={styles.item} href="/tags">Tags</a> */}
  </nav>
);

export default Navigation;

const styles = {
  nav: {
    display: 'flex',
  },
  item: {
    padding: 5,
  },
};
