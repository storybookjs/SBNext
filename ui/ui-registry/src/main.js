import React from 'react';
import { getComponent, registerComponent, getComponentsMap } from './registry';

function createStorybookContext() {
  const componentsMap = getComponentsMap();
  return React.createContext(componentsMap);
}

const StorybookContext = createStorybookContext();

export * from './keys';
export { getComponent, registerComponent, StorybookContext };
