import createTorrent from 'create-torrent';
import config from 'config';



export default function create(input, eos, account, path, short_name){
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
                //#todo calculate checksum
                users.addstorage(account, `storage{${account},${path},${short_name},null`)
            });
            // return torrent to be added to client for upload to superpeer
            return torrent;
        }
        return err
    });

}