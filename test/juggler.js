var should = require( 'chai' ).should(),
    parser = require( '../parseExportedEmails' ),
    fs = require('fs'),
    juggler = require( '../juggler' ).run;

describe( 'base functionality', function () {
    it( '1 source without blacklists', function () {
        juggler(['./test/source1.csv'],null).should.equal(fs.readFileSync('./test/result_s.csv' ).toString());
    } );
    it( '2 sources with duplicates', function () {
        juggler(['./test/source1.csv', './test/source2.csv'],null).should.equal(fs.readFileSync('./test/result_s.csv' ).toString());
    } );
    it( '2 sources with blacklists', function () {
        juggler(['./test/source1.csv', './test/source2.csv'],['./test/blacklist1.csv']).should.equal(fs.readFileSync('./test/result_s_minus_b.csv' ).toString());
    } );
} )