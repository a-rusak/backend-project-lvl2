const path = require('path');
const fs = require('fs');

exports.fetchJson = (fileName) => {
  const buf = fs.readFileSync(path.resolve('__fixtures', fileName));
  return JSON.parse(buf.toString('utf8'));
};
