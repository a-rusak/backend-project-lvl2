const { fetchJson } = require('./src/reader');
const { getDiff } = require('./src/diff');
const { formatToString } = require('./src/formatter');

exports.getFormattedDiff = (name1, name2) => {
  const o1 = fetchJson(name1);
  const o2 = fetchJson(name2);
  return formatToString(getDiff(o1, o2));
};
