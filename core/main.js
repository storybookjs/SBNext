export const runtime = m => {
  // ENABLE HMR
  if (m && m.hot) {
    m.hot.accept(() => {
      console.log('ACCEPTED');
    });
    m.hot.dispose(() => {
      console.log('DISPOSED');
    });
  }

  console.log('storybook runtime ENABLED for', m);
};
