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
    .option( '-b, --blacklists <items>', 'Returns difference between diff and sources', parseList )
    .parse( process.argv );


var run = function( sources, blacklists ){
    var uniqSourceEmails = [];
    var uniqBlacklistsEmails = [];
    var emails = [];

    uniqSourceEmails = parser.mergeFiles( sources );
    emails = uniqSourceEmails;

    if ( blacklists && is.array( blacklists ) ) {
        uniqBlacklistsEmails = parser.mergeFiles( blacklists );
        emails = _.difference( uniqSourceEmails, uniqBlacklistsEmails )
    }
    return emails.sort().join("\n");
}

module.exports = {
    run : run
}

var result = run(program.sources, program.blacklists)
console.log(result);