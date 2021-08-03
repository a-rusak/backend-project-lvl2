const { parse } = require('./src/parsers');
const { getDiff } = require('./src/diff');
const formatter = require('./src/formatter');

exports.getFormattedDiff = (name1, name2, format = 'stylish') => {
  const o1 = parse(name1);
  const o2 = parse(name2);
  return formatter[format](getDiff(o1, o2));
};
