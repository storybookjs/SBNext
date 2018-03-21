const hmrCode = `
console.log('HMR CODE');
if (module && module.hot) {
	module.hot.accept(() => {
    console.log('ACCEPTED');
  });
  module.hot.dispose(() => {
    console.log('DISPOSED');
  });
}
`;

module.exports = source =>
  []
    .concat(source, hmrCode)
    .join('\n')
    .trim();
