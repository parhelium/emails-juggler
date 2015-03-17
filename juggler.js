#!/usr/bin/env node

var is = require( 'is_js' );
var parser = require( './parseExportedEmails' );
var program = require( 'commander' );
var _ = require( 'lodash' );

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

console.log( 'sources amount of emails :  ', uniqGoodEmails.length )
emails = uniqGoodEmails;

if ( program.diff && is.array( program.diff ) ) {
    uniqBadEmail = parser.mergeFiles( program.diff );
    emails = _.difference( uniqGoodEmails, uniqBadEmail )
}
console.log( 'emails to remove amount : ', uniqBadEmail.length )
console.log( 'sources - diff emails amount : ', uniqGoodEmails.length )
