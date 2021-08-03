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

  const getCloseBrackets = (lastDepth, depth) => {
    const closeBrackets = [];
    let currentDepth = lastDepth;
    if (lastDepth > depth) {
      while (currentDepth > depth) {
        currentDepth -= 1;
        closeBrackets.push(`\n${' '.repeat(currentDepth * 4)}}`);
      }
    }
    return closeBrackets;
  };

  const strings = arr.map(([key, { $body, $type, $depth }], idx) => {
    const isLastIndex = arr.length - 1 === idx;
    const lastDepth = arr[idx - (idx > 0 ? 1 : 0)][1].$depth;
    const indent = ' '.repeat($depth * 4 - 2) + ($type ? `${signMapping[$type]} ` : '  ');
    return `${getCloseBrackets(lastDepth, $depth).join('')}\n${indent}${key}: ${$body === undefined ? '{' : $body}${isLastIndex ? `${getCloseBrackets(lastDepth - 2, $depth - 1).join('')}` : ''}`;
  }, []);
  return `{${strings.join('')}\n}\n`;
};
