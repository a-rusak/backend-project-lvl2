const {
  compareMapping: {
    IN_SECOND_ONLY, EQUAL, IN_FIRST_ONLY, DIFF_VALUE, DIFF_VALUE_SECOND,
  },
} = require('./compareMapping');

exports.formatToString = (arr) => {
  const signMapping = {
    [IN_SECOND_ONLY]: '+',
    [EQUAL]: ' ',
    [IN_FIRST_ONLY]: '-',
    [DIFF_VALUE]: '-',
    [DIFF_VALUE_SECOND]: '+',
  };
  const strings = arr.map(([key, { $body, $type, $depth }], idx) => {
    const lastDepth = arr[idx - (idx > 0 ? 1 : 0)][1].$depth;
    const indent = ' '.repeat($depth * 4 - 2) + ($type ? `${signMapping[$type]} ` : '  ');
    const closeBrackets = lastDepth > $depth ? `${'.'.repeat($depth * 4)}}\n`.repeat(lastDepth - $depth) : '';
    // ' '.repeat($depth * 4)
    return `${closeBrackets}${indent}${key}: ${$body === undefined ? '{' : $body}\n`;
  }, []);
  return `{\n${strings.join('')}\n}`;
};
