import React from 'react';

import loadEntries from '../entries/load';
import withDocs, { entries } from './docs';

jest.mock('../entries/load');

describe('withDocs', () => {
  test('exports HOC withDocs as default', () => {
    expect(withDocs).toBeDefined();
  });

  test('withDocs should add `docs` property to getInitialProps', async () => {
    const expected = [{ data: {}, content: '' }];
    const Component = withDocs(({ docs }) => <div>There are {docs.length} docs</div>);

    loadEntries.mockReturnValueOnce(expected);
    const actual = await Component.getInitialProps();

    expect(actual.docs).toMatchSnapshot();
  });
});

describe('entries', () => {
  test('exports entries function', () => {
    expect(entries).toBeDefined();
  });
});
