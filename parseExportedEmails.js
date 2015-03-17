var _ = require( 'lodash' );
var fs = require( 'fs' );
var is = require( 'is_js' );

var parseEmails =  function ( filePath ) {
    var file = fs.readFileSync( filePath ).toString();
    var lines = file.split( "\n" );
    var emails = [];
    _.forEach( lines, function ( line, index, array ) {
        var email = line.split( "," )[0];
        if ( is.email( email ) ) {
            emails.push( line.split( "," )[0] );
        } else {
            //console.warn( "At line : " + index + " : This is not email ->  ", email );
        }
    } )
    return emails;
};

var mergeFiles = function ( files ) {
    var emails = [];
    try {
        _.forEach( files, function ( filePath ) {
            emails = emails.concat( parseEmails( filePath ) );
        } )
    } catch ( e ) {
        console.error( 'mergeFiles : Cannot proceed : ', e )
    }
    return _.uniq( emails );
}

module.exports = {
    parseEmails : parseEmails,
    mergeFiles: mergeFiles
}