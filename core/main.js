export const runtime = (m, examples) => {
  // ENABLE HMR
  if (m && m.hot) {
    m.hot.accept(() => {
      console.log('ACCEPTED');
    });
    m.hot.dispose(() => {
      console.log('DISPOSED');
    });
  }

  console.log('storybook runtime ENABLED for', m, examples);
  // try {
  //   __webpack_require__(m);
  //   debugger;
  // } catch (err) {
  //   console.log(err);
  // }
  // try {
  //   require(m.id);
  //   debugger;
  // } catch (err) {
  //   console.log(err);
  // }
};
