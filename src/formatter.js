const { compareMapping } = require('./compareMapping');

exports.formatToString = (arr) => {
  const diffStr = arr.reduce((acc, [key, { value, state }]) => {
    const { sign } = Object.values(compareMapping).find(({ name }) => name === state);
    return `${acc}
  ${sign} ${key}: ${value}`;
  }, '');
  return `{${diffStr}\n}`;
};
