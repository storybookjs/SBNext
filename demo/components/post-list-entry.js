import React from 'react';
import Link from '@sb/serve/link';
import { Content } from '@sb/serve/post';

const PostListEntry = ({ data, content, excerpt = true }) => {
  const { url, title, date, _entry, page = 'post' } = data;

  return (
    <article>
      <h1>
        {/* <a href={url}>{title}</a> */}
        <Link data={data} content={content}>
          <a>{title}</a>
        </Link>
      </h1>
      <span>{`${new Date(date).toDateString()}`}</span>
      <Content data={data} content={content} excerpt={excerpt} />
    </article>
  );
};

export default PostListEntry;
