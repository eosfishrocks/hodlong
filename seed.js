let cryptotic = require('cryptico')
var Hodlong = require('./index')
var HAPI = require('./../hodlong-test/hodlong-api')

let eosEndpoint = 'http://127.0.0.1:8888'
let privatePassphrase = 'This is a test phrase'
let userA = 'usera'
let trackerUserA = 'trackerusera'
let eosPrivateKeyUserA = '5Kc4Vt2i4v8XqFK8PbfFn15umSQ9Eeh5fjCbJjc9VqQPMgLnyJH'
let RSABits = 1024;
let privateKey = cryptotic.generateRSAKey(privatePassphrase, RSABits);
let publicKey = cryptotic.publicKeyString(privateKey);
let fs = require('fs')
let usera_hapi = new HAPI(eosEndpoint, userA, eosPrivateKeyUserA, privateKey, publicKey);

var uclient = new Hodlong()
var sclient = new Hodlong()

var magnetURI = 'c729237ca5e6a076d984d84d598f8de101e811ce'

sclient.seed('./../hodlong-test/__assets__', function (torrent) {
  console.log('Client is seeding:', torrent.infoHash)
})
