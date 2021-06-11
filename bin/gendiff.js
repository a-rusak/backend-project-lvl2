#!/usr/bin/env node

const { Command } = require('commander');
const { fetchJson } = require('../src/reader');
const { getDiff } = require('../src/diff');
const { print } = require('../src/printer');

const program = new Command();
program.version('0.0.1');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');
program.option('-f, --format <type>', 'output format');

program
  .arguments('<file1> <file2>')
  .action((name1, name2) => {
    const o1 = fetchJson(name1);
    const o2 = fetchJson(name2);
    const diffArr = getDiff(o1, o2);
    console.log(print(diffArr));
  });

program.parse(process.argv);
program.option('-V, --version', 'output the version number');
program.option('-h, --help','output usage information');
const options = program.opts();
