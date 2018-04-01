import * as messages from './messages';

export const renderers = items =>
  items.reduce((acc, item) => {
    switch (true) {
      case typeof item === 'string': {
        try {
          return acc.concat(require(`@sb/renderer-${item}/definition`).default);
        } catch (error) {
          messages.renderer.unloadable({ name: item });
          return acc;
        }
      }
      case typeof item.name === 'string' && Array.isArray(item.dependencies): {
        return acc.concat(item);
      }
      default: {
        messages.renderer.unknown({ obj: item });
        return acc;
      }
    }
  }, []);
