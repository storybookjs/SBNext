export const runtime = ({ examples, m, p }) => {
  // ENABLE HMR
  if (m && m.hot) {
    m.hot.accept(() => {
      console.log('ACCEPTED', p);
    });
    m.hot.dispose((...params) => {
      debugger;
      console.log('DISPOSED', m);
    });
  }

  console.log('storybook runtime ENABLED for', m, examples, p);
};
