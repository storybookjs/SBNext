import React from 'react';

import Link from '@sb/serve/link';

export default ({ items }) => (
  <div>
    {items.map((post, idx) => (
      <Link {...post} key={`sidebar-post-${idx}`}>
        <a>{post.data.title}</a>
      </Link>
    ))})}
  </div>
);
