#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');
program.parse();
program.option('-V, --version', 'output the version number');
program.option('-h, --help','output usage information');
