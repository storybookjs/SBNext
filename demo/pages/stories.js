import React, { Component } from 'react';
import withDocs, { withDocsFilterBy, inCategory } from '@sb/serve/docs';
import { Content } from '@sb/serve/doc';

const category = 'docs';
const withDocs = withDocsFilterBy(inCategory(category, { includeSubCategories: true }));

class Docs extends Component {
  static async getInitialProps({ query }) {
    if (query) {
      const { category } = query;
      return {
        selected: category,
      };
    }
  }

  render() {
    const { docs, selected } = this.props;

    const docs = docs.filter(inCategory(selected));
    return (
      <main>
        <h1>{selected.replace(`${category}/`, '')}</h1>
        <section>
          {docs.map((story, idx) => (
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

export default withDocs(Docs);
