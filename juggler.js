#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var _ = require('lodash');

// var ts      = "the-shopist.csv";
// var we      = "welonik.csv";
// var tsFile = fs.readFileSync(ts).toString();


function parseList(val) {
	return val.split(',');
}


program
	.version('0.0.1')
	.usage('-l a.csv,b.csv,c.csv --diff')
	.option('-s, --sources <items>', 'A list of source files.', list)
	.option('-d, --diff <items>', 'Returns difference between source files.',
		parseList)
	.parse(process.argv);


console.log(' list: %j', program.list);
var diff = true;
var uniq = true;
