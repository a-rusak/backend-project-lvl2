const { parse } = require('./src/parsers');
const { getDiff } = require('./src/diff');
const { formatToString } = require('./src/formatter');

exports.getFormattedDiff = (name1, name2) => {
  const o1 = parse(name1);
  const o2 = parse(name2);
  return formatToString(getDiff(o1, o2));
};
