import { location } from 'global';

export const runtime = (m, examples, renderer) => {
  // ENABLE HMR
  if (m && m.hot) {
    m.hot.accept(() => {
      location.reload();
    });
    m.hot.dispose(() => {
      console.log('DISPOSED');
    });
  }

  console.log('storybook runtime ENABLED for', { examples });

  renderer(Object.values(examples));
};

if (module.hot) {
  module.hot.decline();
}

console.log('Storybook runtime actived');
