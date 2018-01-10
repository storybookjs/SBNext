import React from 'react';
import renderer from 'react-test-renderer';

import unified from 'unified';
import { byFileName } from '../entries/load';
import withDoc, { Content } from '../components/doc';

jest.mock('../entries/load');
jest.mock('unified', () => {
  class Impl {
    use = mockedUnified.use;
    processSync = mockedUnified.processSync;
  }
  function mockedUnified() {
    return new Impl();
  }
  mockedUnified.processSync = jest.fn();
  mockedUnified.use = jest.fn(function mockUse() {
    return this;
  });

  return mockedUnified;
});

describe('withDoc', () => {
  test('exports HOC withDoc as default', () => {
    expect(withDoc).toBeDefined();
  });

  test('withDocs should add `doc` property to getInitialProps', async () => {
    const expected = { data: {}, content: '' };
    const expectedFileName = 'fake';
    const Component = withDoc(() => <div>Test</div>);

    byFileName.mockReturnValueOnce(expected);
    const actual = await Component.getInitialProps({ query: { _entry: expectedFileName } });

    expect(actual.doc).toBeDefined();
    expect(actual.doc).toEqual(expect.objectContaining(expected));
    expect(byFileName).toHaveBeenCalledWith(expectedFileName);
  });
});

describe('Content', () => {
  test('exports Content', () => {
    expect(Content).toBeDefined();
  });

  test('Content component should render doc content', () => {
    const expectedContent = 'lorem ipsum';

    unified.processSync.mockReturnValueOnce({ contents: <p>{expectedContent}</p> });

    const comp = renderer.create(<Content content={expectedContent} />);

    expect(unified.processSync).toHaveBeenCalledWith(expectedContent);
    expect(comp.toJSON()).toMatchSnapshot();
  });
});
