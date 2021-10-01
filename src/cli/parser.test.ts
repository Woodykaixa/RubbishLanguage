import { CommandLineParser } from './parser';
test('ignores unknown options', () => {
  const parser = new CommandLineParser<{}>({});
  const result = parser.parse(['no-dash', '-dash', '--2dash', '😂', '中文']);
  expect(result).toStrictEqual({});
});

test('parse with nullable options', () => {
  const parser = new CommandLineParser<{ test: number }>({
    test: {
      typename: 'number',
      main: 'test',
      nullable: true,
      transformer: input => parseInt(input, 10),
    },
  });
  const result = parser.parse(['--test', '123']);
  expect(result).toStrictEqual({
    test: 123,
  });
});

test('parse with non-nullable options', () => {
  const parser = new CommandLineParser<{ test1: number; test2: number }>({
    test1: {
      typename: 'number',
      main: 'test1',
      nullable: false,
      default: 114514,
      transformer: input => parseInt(input, 10),
    },
    test2: {
      typename: 'number',
      main: 'test2',
      nullable: false,
      default: 1919810,
      transformer: input => parseInt(input, 10),
    },
  });
  const result = parser.parse(['--test', '123']);
  expect(result).toStrictEqual({
    test1: 114514,
    test2: 1919810,
  });

  const result2 = parser.parse(['--test1=123', '123']);
  expect(result2).toStrictEqual({
    test1: 123,
    test2: 1919810,
  });
});

test('parse with unknown options', () => {
  const parser = new CommandLineParser<{ test1: number; test2: string }>({
    test1: {
      typename: 'number',
      main: 'test1',
      nullable: true,
      transformer: input => parseInt(input, 10),
    },
    test2: {
      typename: 'string',
      main: 'test2',
      nullable: false,
      default: '',
      transformer: null,
    },
  });
  const result = parser.parse(['no-dash', '-dash', '--dash2', '--test2', '😂中文']);
  expect(result).toStrictEqual({
    test2: '😂中文',
  });
});