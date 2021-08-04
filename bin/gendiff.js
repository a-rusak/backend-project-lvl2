#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

import getFormattedDiff from '../index.js';

const program = new Command();
program.version('0.0.1');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');
program.option('-f, --format <type>', 'output format', 'stylish');

program
  .arguments('<file1> <file2>')
  .action((name1, name2) => {
    const { format } = program.opts();
    const str = getFormattedDiff(name1, name2, format);
    console.log(str);
  });

program.parse(process.argv);
program.option('-V, --version', 'output the version number');
program.option('-h, --help', 'output usage information');
// const options = program.opts();
