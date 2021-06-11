exports.print = (arr) => {
  return arr.reduce((acc, [key, { value }]) => {
    return `${acc}
     ${key}: ${value}`
  }, '');
}
