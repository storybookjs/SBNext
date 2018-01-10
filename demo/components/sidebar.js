import React from 'react';

import Link from '@sb/serve/link';

export default ({ items }) => (
  <div>
    {items.map((doc, idx) => (
      <Link {...doc} key={`sidebar-doc-${idx}`}>
        <a>{doc.data.title}</a>
      </Link>
    ))})}
  </div>
);
