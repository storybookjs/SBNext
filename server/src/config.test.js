import loadEntries from './entries/load';
import SBConfig, { exportPathMap } from './config';

jest.mock('./entries/load');

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

  test('generates doc entry with default page', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: 'doc' } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).toHaveProperty('/test', { page: '/doc' });
  });

  test('generates doc entry with given page', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: 'test' } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).toHaveProperty('/test', { page: '/test' });
  });

  test('does not generates doc entry if page is false', async () => {
    loadEntries.mockReturnValueOnce([{ data: { url: '/test', page: false } }]);

    expect(exportPathMap).toBeDefined();
    const result = await exportPathMap();

    expect(result).toBeDefined();
    expect(loadEntries).toBeCalled();
    expect(result).toHaveProperty('/');
    expect(result).not.toHaveProperty('/test', { page: '/test' });
  });
});
