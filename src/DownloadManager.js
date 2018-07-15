import WebTorrent from 'webtorrent';
import 'lscache';

const DownloadManger = class  DownloadManager {
    queue = [];
    active = {};
    client;
    constructor() {
         this.queue.push("");
         this.client = new WebTorrent();
    }
    async getItem(itemKey){
        const item = lscache.get(itemKey);
        if (item) return item;
        else return this._fetchFromNetwork(itemKey);
    }
    _fetchFromNetwork(itemKey){
        client.add(itemKey, function(data){
            console.log("Downloading from:", torrent.infoHash)
            data.files.forEach(function(file){
                lscache.set(itemKey, file)
            })
        });
    }
};

export default DownloadManger;
