import WebTorrent from 'webtorrent';
import 'lscache';
import workerpool from 'workerpool';
import Client from 'bittorrent-tracker';
import config from './config';

const DownloadManger = class DownloadManager {

    constructor(opts) {
        this.client = new WebTorrent();
        this.queue = [];
        this.active = [];
        this.requests = [];
        if (!opts) this.opts = {
            peerId: new Buffer(config.CLIENT_PEER_ID), // hex string or Buffer
            announce: [config.TRACKER], // list of tracker server urls
            port: 6881, // torrent client port, (in browser, optional)
            getAnnounceOpts: function () {
                // Provide a callback that will be called whenever announce() is called
                // internally (on timer), or by the user
                return {
                    uploaded: 0,
                    downloaded: 0,
                    left: 0,
                    customParam: 'blah' // custom parameters supported
                }
            },
            // RTCPeerConnection config object (only used in browser)
            rtcConfig: {},
            // User-Agent header for http requests
            userAgent: '',
            // Custom webrtc impl, useful in node to specify [wrtc](https://npmjs.com/package/wrtc)
            wrtc: {},
        };
        this.client = new Client(this.opts);

        this.client.on('error', function (err) {
            // fatal client error!
            console.log(err.message)
        });

        this.client.on('warning', function (err) {
            // a tracker was unavailable or sent bad data to the client. you can probably ignore it
            console.log(err.message)
        });
        this.client.start();

        this.client.torrents.on('wire', function (wire){
            for (let item in this.active){
                let torrent = client.get(item);
                if (torrent.status() === 200 && this.active.filter(function (torrent) {return torrent.magnetURI === torrent.magnetURI}))
                {
                    this.client.remove(torrent.magnetURI);
                }
            }
        })
    }

    _requestedItems(item){
        this.requests.append(item);
    }

    async getItem(itemKey) {
        const item = lscache.get(itemKey);
        if (item) return item;
        else return this._fetchFromNetwork(itemKey);
    }
    _fetchFromNetwork(itemKey) {

        this.client.on('update', function (data) {
            console.log('got an announce response from tracker: ' + data.announce);
            console.log('number of seeders in the swarm: ' + data.complete);
            console.log('number of leechers in the swarm: ' + data.incomplete)
        });
        this.client.once('peer', function (address) {
            console.log('found a peer: ' + address)
        });

        this.client.add(itemKey, function (data) {
            console.log("Downloading from:", torrent.infoHash);
            if (this.active.length < 5) {
                queue.append(itemKey);
            }
            active.append(itemKey);
            data.files.forEach(function (file) {
                lscache.set(itemKey, file)
            })
        });
    }

    _scrapeTracker() {

// announce that download has completed (and you are now a seeder)
        this.client.complete();

// force a tracker announce. will trigger more 'update' events and maybe more 'peer' events
        this.client.update();

// provide parameters to the tracker
        this.client.update({
            uploaded: 0,
            downloaded: 0,
            left: 0,
            customParam: 'blah' // custom parameters supported
        });

    }
    _shutdown(){

            // stop getting peers from the tracker, gracefully leave the swarm
        this.client.stop();

        // ungracefully leave the swarm (without sending final 'stop' message)
        this.client.destroy();

        // scrape
        this.client.scrape();

        this.client.on('scrape', function (data) {
            console.log('got a scrape response from tracker: ' + data.announce);
            console.log('number of seeders in the swarm: ' + data.complete);
            console.log('number of leechers in the swarm: ' + data.incomplete);
            console.log('number of total downloads of this torrent: ' + data.downloaded);
        })
    }
};

export default DownloadManger;
