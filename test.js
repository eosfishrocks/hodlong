let cryptotic = require('cryptico')
var WebTorrent = require('./index')
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
let userAHAPI = new HAPI(eosEndpoint, userA, eosPrivateKeyUserA, privateKey, publicKey);

let opts = {
  hapi: userAHAPI
}

var uclient = new WebTorrent(opts)

var magnetURI = 'c729237ca5e6a076d984d84d598f8de101e811ce'

uclient.add(magnetURI, function (torrent) {
  // Got torrent metadata!
  console.log('Client is downloading:', torrent.infoHash)

  torrent.files.forEach(function (file) {
    // Display the file by appending it to the DOM. Supports video, audio, images, and
    // more. Specify a container element (CSS selector or reference to DOM node).
    fs.write(`./download/` + file)
  })
})
