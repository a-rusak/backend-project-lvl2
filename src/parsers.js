const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const parserMapping = {
  '.json': (buf) => JSON.parse(buf.toString('utf8')),
  '.yml': (buf) => yaml.load(buf, 'utf8'),
  '.yaml': (buf) => yaml.load(buf, 'utf8'),
};

exports.parse = (fileName) => {
  const ext = path.extname(fileName);
  const buf = fs.readFileSync(path.resolve('__fixtures', fileName));

  // TODO: error handling
  try {
    return parserMapping[ext](buf);
  } catch (err) {
    throw new Error(err);
  }
};
