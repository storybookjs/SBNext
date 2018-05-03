const components = new Map();

export function registerComponent(key, component) {
  components.set(key, component);
}

export function getComponent(key) {
  return components.get(key);
}

export function getComponentsMap() {
  return Array.from(components).reduce((acc, [key, component]) => {
    acc[key] = component;
    return acc;
  }, {});
}
