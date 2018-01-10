import glob from 'glob';
import fetch from 'unfetch';
import { isServer } from './env';
import processEntries from './process';

// SUT
import loadEntries, { byFileName } from './load';

jest.mock('glob');
jest.mock('fs');
jest.mock('unfetch');
jest.mock('./env');
jest.mock('./process');

describe('loadEntries', () => {
  test('exports loadEntries fn as default', () => {
    expect(loadEntries).toBeDefined();
  });
});

describe('from Server', () => {
  beforeEach(() => {
    isServer.mockReturnValue(true);
  });

  afterEach(() => {
    isServer.mockRestore();
  });

  test('loadEntries retrieves an array of docs reading from Server', async () => {
    const files = ['docs/test.md'];
    const docs = [{ data: {}, content: '' }];

    glob.sync.mockReturnValueOnce(files);

    processEntries.mockReturnValueOnce(docs);

    const actual = await loadEntries();

    expect(actual).toEqual(expect.arrayContaining(docs));
  });

  test('byFileName retrieves a doc reading from Server', async () => {
    const files = ['docs/test.md'];
    const doc = { data: {}, content: '' };
    const docs = [doc];

    glob.sync.mockReturnValueOnce(files);

    processEntries.mockReturnValueOnce(docs);

    const actual = await byFileName('docs/test.md');

    expect(actual).toEqual(expect.objectContaining(doc));
  });
});

describe('from Client', () => {
  beforeEach(() => {
    isServer.mockReturnValue(false);
    global.__NEXT_DATA__ = {};
  });

  afterEach(() => {
    isServer.mockRestore();
  });

  test('loadEntries retrieves an array of docs fetching from Server', async () => {
    const docs = [{ data: {}, content: '' }];

    fetch.mockReturnValueOnce(Promise.resolve({ json: () => docs }));

    processEntries.mockReturnValueOnce(docs);

    const actual = await loadEntries();

    expect(actual).toEqual(expect.arrayContaining(docs));
    expect(fetch).toHaveBeenCalledWith('/_load_entries');
  });

  test('byFileName retrieves a doc fetching from Server', async () => {
    const doc = { data: {}, content: '' };
    const docs = [doc];
    const path = 'doc/test.md';

    fetch.mockReturnValueOnce(Promise.resolve({ json: () => doc }));

    processEntries.mockReturnValueOnce(docs);

    const actual = await byFileName(path);

    expect(actual).toEqual(expect.objectContaining(doc));
    expect(fetch).toHaveBeenCalledWith(`/_load_entry/${path}`);
  });
});
