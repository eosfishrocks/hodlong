# HODLONG

> A peer-to-peer hypermedia protocol to make the web faster, safer, and more open based off of webRTC and webtorrent. Development contributers include BPFish, EosHuobipool, Eosflytomars, EosCannonch, and ZbEOSpool.


## Overview

[HODLONG](https://github.com/ipfs/faq/issues/76) is a universal javascript library that allows secure content to distributed to any platform. By using crypto shims, the library can run on a browser, a react-native applciation, or a electron built executable. HODLONG enables the creation of completely distributed applications. It aims to make the web faster, safer, and more open.

HODLONG is a distributed file store that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but HODLONG is actually more similar to a single bittorrent swarm exchanging objects over


## What is HODLONG

HODLONG is a web torrent protocol:
- defines a content-addressed file store
- coordinates content delivery
- coordinates statistics verification across nodes.
- combines Webtorrent-DHT + Webtorrent + A modular approach to blockchain storage mechanisms.

HODLONG is not a filesystem:
- currently uses key: value stores to access assets. Future versions may include file system support.

HODLONG is a web:
- can be used to view documents like the web
- files accessible via HTTP at `https://hodl.ong/<key>`
- browsers can use this library to directly access files from the network, use as a connection manager, and serve files that are no longer stored by the cdn. 
- hash-addressed content guarantees authenticity

HODLONG is modular:
- data can be stored on most popular blockchains
- connection layer over any network protocol
- Multiple routing layer
- uses a routing layer DHT (webtorrent-dht/webtorrent) and blockchain stored routes.
- uses bittorrent-inspired block exchange

HODLONG uses crypto:
- cryptographic-hash content addressing
- block-level deduplication
- file integrity + versioning

HODLONG is p2p:
- worldwide peer-to-peer file transfers
- completely decentralized architecture
- **no** central point of failure

HODLONG is a cdn:
- add a file to the filesystem locally, and it's now available to the world
- caching-friendly (content-hash naming)
- bittorrent-based bandwidth distribution


### Pre-Alpha Distribution

This is currently at the pre-alpha, Proof-of-concept,stage, and not ready for production. 

## License

MIT. This project and README are inspired by the IPFS project, but they do not share any code. 

## Contributers

HODLONG is a EOSFish, EosHuobipool, Eosflytomars, and EosCannonch project.