import React, { Component } from 'react';
import withPosts, { withPostsFilterBy, inCategory } from '@sb/serve/posts';
import { Content } from '@sb/serve/post';

const category = 'stories';
const withStories = withPostsFilterBy(inCategory(category, { includeSubCategories: true }));

class Stories extends Component {
  static async getInitialProps({ query }) {
    if (query) {
      const { category } = query;
      return {
        selected: category,
      };
    }
  }

  render() {
    const { posts, selected } = this.props;

    const stories = posts.filter(inCategory(selected));
    return (
      <main>
        <h1>{selected.replace(`${category}/`, '')}</h1>
        <section>
          {stories.map((story, idx) => (
            <article key={`${selected}-story-${idx}`}>
              <h2>{story.data.title}</h2>
              <Content {...story} excerpt />
            </article>
          ))}
        </section>
      </main>
    );
  }
}

export default withStories(Stories);
