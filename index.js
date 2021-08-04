import parse from './src/parser.js';
import getDiff from './src/diff.js';
import formatter from './src/formatters/index.js';

export default (name1, name2, format = 'stylish') => {
  const o1 = parse(name1);
  const o2 = parse(name2);
  return formatter[format](getDiff(o1, o2));
};
