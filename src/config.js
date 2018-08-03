const EOS_HOST = 'http://127.0.0.1:8888';
const HOSTNAME = '127.0.0.1';
let PUBLIC_KEY = '';
let PRIVATE_KEYS = [];
let PRIVATE_KEYS_TEST = [];
const SERVER="active";
const TRACKER = `http://${HOSTNAME}:${TRACKER_PORT}`;
const TRACKER_PORT = '1337';
const TRACKER_ANNOUNCE = `${TRACKER}/announce`
module.exports = {
    EOS_HOST,
    PUBLIC_KEY,
    PRIVATE_KEYS,
    PRIVATE_KEYS_TEST,
    SERVER,
    TRACKER,
    TRACKER_PORT
};
