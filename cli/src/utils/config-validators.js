import * as messages from '@sb/core-messages/src/renderer';

export const renderers = items =>
  items.reduce((acc, item) => {
    switch (true) {
      case typeof item === 'string': {
        try {
          return acc.concat(require(`${item}/definition`).default);
        } catch (error) {
          messages.unloadable({ name: item });
          return acc;
        }
      }
      case typeof item.name === 'string' && Array.isArray(item.dependencies): {
        return acc.concat(item);
      }
      default: {
        messages.unknown({ obj: item });
        return acc;
      }
    }
  }, []);
