/* global Blob */

var Buffer = require('safe-buffer').Buffer
var fixtures = require('webtorrent-fixtures')
var test = require('tape')
var Hodlong = require('../')
var cryptico = require('cryptico')

test('client.seed: torrent file (Buffer)', function (t) {
  t.plan(6)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent) {
    t.equal(client.torrents.length, 1)
    t.equal(torrent.infoHash, fixtures.leaves.parsedTorrent.infoHash)
    t.equal(torrent.magnetURI, fixtures.leaves.magnetURI)

    client.remove(torrent, function (err) { t.error(err, 'torrent removed') })
    t.equal(client.torrents.length, 0)

    client.destroy(function (err) { t.error(err, 'client destroyed') })
  })
})

test('client.seed: torrent file (Buffer), set name on buffer', function (t) {
  t.plan(6)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  var buf = Buffer.from(fixtures.leaves.content)
  buf.name = 'Leaves of Grass by Walt Whitman.epub'

  client.seed(buf, { announce: [] }, function (torrent) {
    t.equal(client.torrents.length, 1)
    t.equal(torrent.infoHash, fixtures.leaves.parsedTorrent.infoHash)
    t.equal(torrent.magnetURI, fixtures.leaves.magnetURI)

    client.remove(torrent, function (err) { t.error(err, 'torrent removed') })
    t.equal(client.torrents.length, 0)

    client.destroy(function (err) { t.error(err, 'client destroyed') })
  })
})

test('client.seed: torrent file (Blob)', function (t) {
  if (typeof Blob === 'undefined') return t.end()

  t.plan(6)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(new Blob([ fixtures.leaves.content ]), {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent) {
    t.equal(client.torrents.length, 1)
    t.equal(torrent.infoHash, fixtures.leaves.parsedTorrent.infoHash)
    t.equal(torrent.magnetURI, fixtures.leaves.magnetURI)

    client.remove(torrent, function (err) { t.error(err, 'torrent removed') })
    t.equal(client.torrents.length, 0)

    client.destroy(function (err) { t.error(err, 'client destroyed') })
  })
})
