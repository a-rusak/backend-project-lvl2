const { test, expect } = require('@jest/globals');

const fs = require('fs');
const path = require('path');
const { getFormattedDiff } = require('../index');

test.skip('Show diff for two json files with deep structure', () => {
  const expectedDiff = fs
    .readFileSync(path.resolve('__fixtures', 'files3-4.diff.txt'))
    .toString('utf8');
  const calculatedDiff = getFormattedDiff('file3.json', 'file4.json');
  expect(calculatedDiff).toBe(expectedDiff);
});

test.skip('Show diff for two yaml files with flat structure', () => {
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

test('Show diff for two json files with flat structure', () => {
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

/*
      {
    +     host: hexlet.io
    +   - timeout: 50
    +   + timeout: 20
        - proxy: 123.234.53.22
    +   - follow: false
        + verbose: true
      }
      ↵
*/

test.skip('Get an error on file not in JSON or YAML format', () => {
  expect(() => {
    getFormattedDiff('file1.txt', 'file2.txt');
  }).toThrow();
});
