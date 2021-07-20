const { test, expect } = require('@jest/globals');

const { getFormattedDiff } = require('../index');

test('Show diff for two json files with flat structure', () => {
  expect(getFormattedDiff('file1.json', 'file2.json')).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('Show diff for two yaml files with flat structure', () => {
  expect(getFormattedDiff('file1.yml', 'file2.yml')).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('Get an error on file not in JSON or YAML format', () => {
  expect(() => {
    getFormattedDiff('file1.txt', 'file2.txt');
  }).toThrow();
});
