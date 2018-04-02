export default string =>
  string
    .split('\n')
    .map(s => s.trim())
    .filter((s, i, l) => !((i === 0 || i === l.length - 1) && s === ''))
    .join('\n');
