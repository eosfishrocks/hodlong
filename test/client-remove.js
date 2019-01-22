var fixtures = require('webtorrent-fixtures')
var test = require('tape')
var Hodlong = require('../')
var cryptico = require('cryptico')

test('client.remove: remove by Torrent object', function (t) {
  t.plan(5)

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

  var torrent = client.add(fixtures.leaves.parsedTorrent.infoHash)
  t.equal(client.torrents.length, 1)

  torrent.on('infoHash', function () {
    t.equal(torrent.infoHash, fixtures.leaves.parsedTorrent.infoHash)

    client.remove(torrent, function (err) { t.error(err, 'torrent destroyed') })
    t.equal(client.torrents.length, 0)

    client.destroy(function (err) { t.error(err, 'client destroyed') })
  })
})
