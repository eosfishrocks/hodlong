import createTorrent from 'create-torrent';
import config from 'config';



export default function create(input, eos, account, shortname){
    const opts = {
        announceList: [[config.TRACKER_ANNOUNCE]],
        comment: `Account: ${account}`,
        name: shortname,
        private: true,
        tracker: config.TRACKER
    };
    createTorrent(input, opts, (err, torrent) => {

        if (!err) {
            eos.transaction('Users', users => {
                users.addstorage(account, filename)
            });
            // return torrent to be added to client for upload to superpeer
            return torrent;
        }
        return err
    });

}