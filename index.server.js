import Server from 'bittorrent-tracker'
var Server = require('bittorrent-tracker').Server;
var config = require('./src/config');
var EOS = require('eosjs');
var express = require('express');
var ProofOfStorage = require('./src/ProofOfStorage');
var ProofOfSeed = require('./src/ProofOfSeed');
var app = express();
var magnetWhitelist = {};
var test = false;


if (process.env.__ENV__ === 'test'){
    test = true;
}

var whitelist = {
    UT: true // uTorrent
};

if (config.PRIVATE_KEY = ""){
    config.PRIVATE_KEY = process.env.PRIVATE_KEY;
}

var server = new Server({
    http: false, // we do our own
    udp: false, // not interested
    ws: true, // enabled to allow browser connections
    filter: function (infoHash, params, cb) {
        // black/whitelist for disallowing/allowing specific clients [default=allow all]
        // this example only allows the uTorrent client

    }
});


// Default configuration (additional options below)
config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: (test ? config.PRIVATE_KEY_TEST : config.PRIVATE_KEYS),
    httpEndpoint: (test ? config.EOS_HOST_TEST : config.EOS_HOST),
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
};

const eos = EOS(config);

var onHttpRequest = server.onHttpRequest.bind(server);
app.get('/announce', onHttpRequest);
app.get('/scrape', onHttpRequest);

app.listen(config.TRACKER_PORT);

// Proof of Seed runtime
while(config.SERVER === "active"){
    ProofOfSeed(eos, server);
    ProofOfStorage(eos, server);
}