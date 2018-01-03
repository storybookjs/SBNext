import React from 'react';

export default ({ tags }) =>
  !!tags.length && (
    <div>
      {tags.map(tag => (
        <span style={styles.tag} key={`tag-${tag}`}>
          &gt; {tag}
        </span>
      ))}
    </div>
  );

const styles = {
  tag: {
    display: 'inline',
    background: '#ccc',
    fontSize: '.75em',
    margin: 3,
    padding: 5,
  },
};
