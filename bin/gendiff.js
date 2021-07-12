#!/usr/bin/env node

const { Command } = require('commander');

const { getFormattedDiff } = require('../index');

const program = new Command();
program.version('0.0.1');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');
program.option('-f, --format <type>', 'output format');

program
  .arguments('<file1> <file2>')
  .action((name1, name2) => {
    const str = getFormattedDiff(name1, name2);
    console.log(str);
  });

program.parse(process.argv);
program.option('-V, --version', 'output the version number');
program.option('-h, --help', 'output usage information');
// const options = program.opts();
