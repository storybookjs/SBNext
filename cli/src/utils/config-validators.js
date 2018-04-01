export const renderers = items =>
  items.reduce((acc, item) => {
    switch (true) {
      case typeof item === 'string': {
        try {
          return acc.concat(require(`@sb/renderer-${item}/definition`).default);
        } catch (error) {
          console.error(`loading ${item} has failed`);
          return acc;
        }
      }
      case typeof item.name === 'string' && Array.isArray(item.dependencies): {
        return acc.concat(item);
      }
      default: {
        console.warn(item, 'is not a valid renderer');
        return acc;
      }
    }
  }, []);
