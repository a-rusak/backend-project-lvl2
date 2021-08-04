import { load } from 'js-yaml';
import { extname, resolve } from 'path';
import { readFileSync } from 'fs';

const parserMapping = {
  '.json': (buf) => JSON.parse(buf.toString('utf8')),
  '.yml': (buf) => load(buf, 'utf8'),
  '.yaml': (buf) => load(buf, 'utf8'),
};

function parse(fileName) {
  const ext = extname(fileName);
  const buf = readFileSync(resolve('__fixtures__', fileName));

  // TODO: error handling
  try {
    return parserMapping[ext](buf);
  } catch (err) {
    throw new Error(err);
  }
}

export default parse;
