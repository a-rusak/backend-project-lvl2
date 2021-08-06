import { load } from 'js-yaml';
import { extname } from 'path';
import { readFileSync } from 'fs';

const parserMapping = {
  '.json': (buf) => JSON.parse(buf.toString('utf8')),
  '.yml': (buf) => load(buf, 'utf8'),
  '.yaml': (buf) => load(buf, 'utf8'),
};

function parse(fileName) {
  const ext = extname(fileName);
  const buf = readFileSync(fileName);

  // TODO: error handling
  try {
    return parserMapping[ext](buf);
  } catch (err) {
    throw new Error(err);
  }
}

export default parse;
