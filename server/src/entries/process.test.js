import { readFileSync, statSync } from 'fs';
import fm from 'frontmatter';
import processEntries from './process';

jest.mock('fs');
jest.mock('frontmatter');

describe('processEntries ', () => {
  test('exports processEntries fn as default', () => {
    expect(processEntries).toBeDefined();
  });

  test('retrieves an array of docs with default values', async () => {
    const expectedPage = 'doc';
    const expectedCategory = undefined;
    const expectedName = 'test';
    const expectedEntry = `docs/${expectedName}.md`;
    const expectedContent = 'text';
    const expectedUrl = `/${expectedName}`;
    const expectedDate = new Date();
    const expectedFileContent = `
        ---
        ---
        ${expectedContent}
        `;

    readFileSync.mockReturnValueOnce(expectedFileContent);

    fm.mockReturnValueOnce({
      data: {},
      content: expectedContent,
    });

    statSync.mockReturnValueOnce({
      birthtime: expectedDate,
    });

    const actual = await processEntries([expectedEntry], 'docs');

    expect(actual).toMatchSnapshot();
  });
});

describe('frontmatter: permalink', () => {
  test('default permalink', async () => {
    const expectedPage = 'doc';
    const expectedCategory = 'category';
    const expectedName = 'test';
    const expectedEntry = `docs/${expectedName}.md`;
    const expectedUrl = `/${expectedCategory}/${expectedName}`;
    const expectedDate = new Date();

    fm.mockReturnValueOnce({
      data: {
        category: expectedCategory,
      },
    });

    statSync.mockReturnValueOnce({
      birthtime: expectedDate,
    });

    const actual = await processEntries([expectedEntry], 'docs');

    expect(actual).toMatchSnapshot();
  });

  test('permalink /:category/:name.html', async () => {
    const permalink = '/:category/:name.html';
    const expectedPage = 'doc';
    const expectedCategory = 'category';
    const expectedName = 'test';
    const expectedEntry = `docs/${expectedName}.md`;
    const expectedUrl = `/${expectedCategory}/${expectedName}.html`;
    const expectedDate = new Date();

    fm.mockReturnValueOnce({
      data: {
        category: expectedCategory,
        permalink,
      },
    });

    statSync.mockReturnValueOnce({
      birthtime: expectedDate,
    });

    const actual = await processEntries([expectedEntry], 'docs');

    expect(actual).toMatchSnapshot();
  });

  test('permalink /:date/:name.html', async () => {
    const permalink = '/:date/:name.html';
    const expectedPage = 'doc';
    const expectedCategory = 'category';
    const expectedName = 'test';
    const expectedEntry = `docs/${expectedName}.md`;
    const dateStr = '2017-05-01';
    const expectedUrl = `/${dateStr}/${expectedName}.html`;
    const expectedDate = new Date(dateStr);

    fm.mockReturnValueOnce({
      data: {
        category: expectedCategory,
        permalink,
        date: expectedDate,
      },
    });

    statSync.mockReturnValueOnce({
      birthtime: expectedDate,
    });

    const actual = await processEntries([expectedEntry], 'docs');

    expect(actual).toMatchSnapshot();
  });
});
