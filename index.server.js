var Server = require('bittorrent-tracker').Server;
var config = require('./src/config');
var EOS = require('eosjs');
var express = require('express');
var BigNumber = require('bignumber.js');


var app = express();
var magnetWhitelist = {};
var test = false;


if (process.env.__ENV__ === 'test') {
    test = true;
}

var whitelist = {
    UT: true // uTorrent
};

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

let approvedObjects = [];
let account = BigNumber(EOS.modules.format.encodeName("hodlong"));

eos.getTableRows({
    json: true,
    code: 'hodlong',
    scope: 'hodlong',
    table: 'user',
    table_key: 'userIndex',
    limit: 1
})
    .then((result) => {
        console.log(result.rows)
        for (row in result.rows){
            for (obj in result.rows[0].seededObjects){
                approvedObjects.push(result.rows[0].seededObjects[obj]);
            }
        }
        console.log(approvedObjects);
    })
    .catch((err) => {console.log(err)});


var server = new Server({
    http: false, // we do our own
    udp: false, // not interested
    ws: true, // enabled to allow browser connections
    filter: function (infoHash, params, cb) {
        // black/whitelist for disallowing/allowing specific clients [default=allow all]
        // this example only allows the uTorrent client
        if (approvedObjects.indexOf(infoHash) > 0){
            cb(null);
        }
        else{
            cb(new Error('disallowed object'));
        }
    }
});

var onHttpRequest = server.onHttpRequest.bind(server);
app.get('/announce', onHttpRequest);
app.get('/scrape', onHttpRequest);

app.listen(config.TRACKER_PORT);
