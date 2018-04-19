import { setOnPath, asChildren, examplesToStack } from './AppLayout3';

test('setOnPath', () => {
  const input = [{ a: { f: 'foo' } }, ['a', 'b'], 'boom'];
  const output = {
    a: { b: 'boom', f: 'foo' },
  };
  expect(setOnPath(...input)).toEqual(output);
});

test('asChildren', () => {
  const input = [
    {
      a: { b: { examples: ['boom'] }, f: { examples: ['foo'] } },
    },
  ];
  const output = [
    {
      text: 'a',
      children: [
        {
          text: 'b',
          value: { examples: ['boom'] },
        },
        {
          text: 'f',
          value: { examples: ['foo'] },
        },
      ],
    },
  ];
  expect(asChildren(...input)).toEqual(output);
});

test('examplesToStack', () => {
  const input = [[['a/b', { examples: ['boom'] }], ['a/f', { examples: ['foo'] }]]];
  const output = [
    {
      text: 'a',
      children: [
        {
          text: 'b',
          value: { examples: ['boom'], key: 'a/b' },
        },
        {
          text: 'f',
          value: { examples: ['foo'], key: 'a/f' },
        },
      ],
    },
  ];
  expect(examplesToStack(...input)).toEqual(output);
});
