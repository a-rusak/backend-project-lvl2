import { test, expect } from '@jest/globals';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import getFormattedDiff from '../index.js';

describe('Show diff for:', () => {
  test('json files with deep structure with default formatting', () => {
    const expectedDiff = readFileSync(resolve('__fixtures__', 'files3-4.diff.txt'))
      .toString('utf8');
    const calculatedDiff = getFormattedDiff('file3.json', 'file4.json');
    expect(calculatedDiff).toBe(expectedDiff);
  });

  test('json files with deep structure with plain formatting', () => {
    const expectedDiff = readFileSync(resolve('__fixtures__', 'files3-4.plain.diff.txt'))
      .toString('utf8');
    const calculatedDiff = getFormattedDiff('file3.json', 'file4.json', 'plain');
    expect(calculatedDiff).toBe(expectedDiff);
  });

  test('json files with deep structure with json formatting', () => {
    const expectedDiff = readFileSync(resolve('__fixtures__', 'files3-4.json.diff.txt'))
      .toString('utf8');
    const calculatedDiff = getFormattedDiff('file3.json', 'file4.json', 'json');
    expect(calculatedDiff).toBe(expectedDiff);
  });

  test('yaml files with flat structure', () => {
    expect(getFormattedDiff('file1.yml', 'file2.yml')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`);
  });

  test('json files with flat structure', () => {
    expect(getFormattedDiff('file1.json', 'file2.json')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`);
  });
});

test('Get an error on file not in JSON or YAML format', () => {
  expect(() => {
    getFormattedDiff('file1.txt', 'file2.txt');
  }).toThrow();
});
