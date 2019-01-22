var Buffer = require('safe-buffer').Buffer
var fixtures = require('webtorrent-fixtures')
var test = require('tape')
var Hodlong = require('../')
var cryptico = require('cryptico')

test('after client.destroy(), throw on client.add() or client.seed()', function (t) {
  t.plan(3)

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

  client.destroy(function (err) { t.error(err, 'client destroyed') })

  t.throws(function () {
    client.add('magnet:?xt=urn:btih:' + fixtures.leaves.parsedTorrent.infoHash)
  })
  t.throws(function () {
    client.seed(Buffer.from('sup'))
  })
})

test('after client.destroy(), no "torrent" or "ready" events emitted', function (t) {
  t.plan(1)

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

  client.add(fixtures.leaves.torrent, { name: 'leaves' }, function () {
    t.fail('unexpected "torrent" event (from add)')
  })
  client.seed(fixtures.leaves.content, { name: 'leaves' }, function () {
    t.fail('unexpected "torrent" event (from seed)')
  })
  client.on('ready', function () {
    t.fail('unexpected "ready" event')
  })

  client.destroy(function (err) { t.error(err, 'client destroyed') })
})
