import loadEntries from '../../src/entries/load';
import SBConfig, { exportPathMap } from '../../src/config';

jest.mock('../../src/entries/load');

describe('config', () => {
  test('exports SBConfig fn as default', () => {
    expect(SBConfig).toBeDefined();
  });
});

describe('exportPathMap', () => {
  test('generates index by default ', async () => {
    loadEntries.mockReturnValueOnce([]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
  });

  test('generates post entry with default page', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: 'post' } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).toHaveProperty('/test', { page: '/post' });
  });

  test('generates post entry with given page', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: 'test' } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).toHaveProperty('/test', { page: '/test' });
  });

  test('does not generates post entry if page is false', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: false } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).not.toHaveProperty('/test', { page: '/test' });
  });
});
