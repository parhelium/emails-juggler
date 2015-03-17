#!/usr/bin/env node

/**
 * Module dependencies.
 */


var is = require( 'is_js' );
var parser = require( './parseExportedEmails' );
var program = require( 'commander' );
var _ = require( 'lodash' );

// var ts      = "the-shopist.csv";
// var we      = "welonik.csv";
// var tsFile = fs.readFileSync(ts).toString();


function parseList( val ) {
    return val.split( ',' );
}


program
    .version( '0.0.1' )
    .option( '-s, --sources <items>', 'A list of source files.', parseList )
    .option( '-d, --diff <items>', 'Returns difference between diff and sources', parseList )
    .parse( process.argv );


console.log( ' sources: ', program.sources );
console.log( ' sources: ', program.diff );



var uniqGoodEmails = [];
var uniqBadEmail = [];
var emails = [];


uniqGoodEmails = parser.mergeFiles( program.sources );
console.log( 'BEFORE : uniqGoodEmails.length = ', uniqGoodEmails.length )
emails = uniqGoodEmails;

if ( program.diff && is.array( program.diff ) ) {
    uniqBadEmail = parser.mergeFiles( program.diff );
    emails = _.difference( uniqGoodEmails, uniqBadEmail )
}
console.log( 'uniqBadEmail.length ', uniqBadEmail.length )
console.log( 'AFTER : uniqGoodEmails.length ', uniqGoodEmails.length )
