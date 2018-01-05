import React from 'react';

const Hello = ({ title }) => (
  <section style={styles.section}>
    <h1>
      <span style={{ fontWeight: 200 }}>Hello, there. I'm </span>SB
    </h1>
    {!title && (
      <p>
        A Blog / Static site generator based in <strong>Next.js</strong>
      </p>
    )}
    {title && <h2>{title}</h2>}
  </section>
);

export default Hello;

const styles = {
  section: {
    height: '100vh',
    color: '#000',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
};
