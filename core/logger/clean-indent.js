export default string =>
  string
    .split('\n')
    .map(s => s.trim())
    .filter((s, i) => !(i === 0 && s === ''))
    .join('\n');
