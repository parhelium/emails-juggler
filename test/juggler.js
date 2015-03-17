var should = require( 'chai' ).should(),
    parser = require( '../parseExportedEmails' ),
    fs = require( 'fs' ),
    juggler = require( '../juggler' ).run;

describe( 'base functionality', function () {
    it( 'sources1 : only one source without blacklist ', function () {
        juggler( ['./test/source1.csv'], null ).should.equal( fs.readFileSync( './test/result_s.csv' ).toString() );
    } );
    it( 'sources11 : source duplicated', function () {
        juggler( ['./test/source1.csv', './test/source1duplicate.csv'], null ).should.equal( fs.readFileSync( './test/result_s.csv' ).toString() );
    } );
    it( 'sources1 - blacklists1 : one source without one blacklist', function () {
        juggler(
            ['./test/source1.csv'],
            ['./test/blacklist1.csv']
        ).should.equal(
            fs.readFileSync( './test/result_s1_minus_b1.csv' ).toString()
        );
    } );
    it( 'sources12 - blacklists12 : two sources without two blacklists', function () {
        juggler(
            ['./test/source1.csv', './test/source2.csv'],
            ['./test/blacklist1.csv', './test/blacklist2.csv']
        ).should.equal(
            fs.readFileSync( './test/result_s12_minus_b12.csv' ).toString()
        );
    } );
} )