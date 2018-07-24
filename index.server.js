var Server = require('bittorrent-tracker').Server;
var config = require('src/config');
var eos = require('eosjs');
var express = require('express');
var app = express();

var whitelist = {
    UT: true // uTorrent
};

if (config.PRIVATE_KEY = ""){
    config.PRIVATE_KEY = process.env.PRIVATE_KEY;
}

var server = new Server({
    http: false, // we do our own
    udp: false, // not interested
    ws: false, // not interested
    filter: function (params) {
        // black/whitelist for disallowing/allowing specific clients [default=allow all]
        // this example only allows the uTorrent client
        var client = params.peer_id[1] + params.peer_id[2]
        return whitelist[client]
    }
});



// Default configuration (additional options below)
config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: [config.privatekeys], // WIF string or array of keys..
    httpEndpoint: config.EOS_HOST,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
};

eos(config);

var onHttpRequest = server.onHttpRequest.bind(server);
app.get('/announce', onHttpRequest);
app.get('/scrape', onHttpRequest);

app.listen(config.TRACKER_PORT);
