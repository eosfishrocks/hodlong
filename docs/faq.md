# Frequently Asked Questions

## What is Hodlong?

**Hodlong** is a storage brokerage that works in your **browser**,
**react mobile**, and **node** javascript implementations.


It's written completely in JavaScript and uses
**WebRTC** for true peer-to-peer transport of data with transportation
available over tcp and udp for **node** clients. There are no browser extensions required,
but we recommend supporting wallets such as Scatter, and Lynx in your applications for user
security.

Using open web standards and open souce technology, Hodlong connects users together
to form a distributed, decentralized browser-to-browser network for efficient file transfer
and allows for the transfer of files for EOSIO tokens.

## Why is this cool?

Imagine a video site like YouTube, where **visitors help to host the site's
content**, decentralized **storage providers** are allowed to be paid for hosting the file,
and users can get paid for creating content. The more people that use a Hodlong-powered website,
the faster and more resilient and immune to censorship it becomes.

Browser-to-browser communication **cuts out the middle-man** and lets people
communicate on their own terms. No more client/server – just a network of peers,
all equal with publicly defined and ratified contracts that allow users to share data, and
pay for storage, and manage content on their own terms.

## What are some use cases for WebTorrent?

One of the most exciting uses for WebTorrent is **peer-assisted delivery**.
Non-profit projects like [Wikipedia][wikipedia] and the [Internet
Archive][archive] could reduce bandwidth and hosting costs by letting visitors
chip in. Popular content is served browser-to-browser, quickly and cheaply.
Rarely-accessed content is served reliably over HTTP from the origin server.

There are also exciting **business use cases**, from CDNs to app delivery.

## How does Hodlong work?

The WebTorrent protocol works just like [BitTorrent protocol][bittorrent-protocol],
except it uses [WebRTC][webrtc] instead of [TCP][tcp]/[uTP][utp] as the transport
protocol.

In order to support [WebRTC's connection model][webrtc-signaling], we made a few
changes to the tracker protocol. Therefore, a browser-based WebTorrent client or
**"web peer"** can only connect to other clients that support WebTorrent/WebRTC.

The protocol changes we made will be published as a
[BEP](http://www.bittorrent.org/beps/bep_0001.html). Until a spec is written, you
can view the source code of the [`bittorrent-tracker`][bittorrent-tracker] package.

Once peers are connected, the wire protocol used to communicate is exactly the same
as in normal BitTorrent. This should make it easy for existing popular torrent
clients like Transmission, and uTorrent to add support for WebTorrent. **Vuze**
[already has support][vuze-support] for WebTorrent!

![WebTorrent network diagram](https://webtorrent.io/img/network.png)

[bittorrent-protocol]: https://wiki.theory.org/BitTorrentSpecification
[webrtc-signaling]: http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/#what-is-signaling
[tcp]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol
[utp]: https://en.wikipedia.org/wiki/Micro_Transport_Protocol
[webrtc]: https://en.wikipedia.org/wiki/WebRTC
[bittorrent-tracker]: https://npmjs.com/package/bittorrent-tracker
[vuze-support]: https://wiki.vuze.com/w/WebTorrent

## How do I get started?

To start using WebTorrent, simply include the
[`webtorrent.min.js`](https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js)
script on your page. If you use [browserify](http://browserify.org/), you can
`npm install webtorrent` and `require('webtorrent')`.

It's easy to download a torrent and add it to the page.

```js
var client = new WebTorrent()

var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

client.add(torrentId, function (torrent) {
  // Torrents can contain many files. Let's use the .mp4 file
  var file = torrent.files.find(function (file) {
    return file.name.endsWith('.mp4')
  })
  file.appendTo('body') // append the file to the DOM
})
```

This supports video, audio, images, PDFs, Markdown, [and more][render-media], right
out of the box. There are additional ways to access file content directly, including
as a node-style stream, Buffer, or Blob URL.

Video and audio content can be streamed, i.e. playback will start before the full
file is downloaded. Seeking works too – WebTorrent dynamically fetches
the needed torrent pieces from the network on-demand.

## What is WebRTC?

WebRTC (Web Real-Time Communication) is an API defined by the World Wide Web
Consortium (W3C) to support browser-to-browser applications like voice calling,
video chat, and P2P file sharing without the need for browser plugins.

WebRTC's `RTCDataChannel` API allows the transfer of data directly from one browser
to another. This is distinct from `WebSocket` and `XMLHttpRequest` because these are
designed for communication to/from a server, i.e. a client-server model. Data
Channels allow for **direct browser-to-browser connections**.

This is revolutionary. Never before could websites connect their users directly to
each other with super low-latency, encrypted, peer-to-peer connections. This will
enable next-generation applications in healthcare, education, science, and more.
WebTorrent is just one example.

WebRTC [works everywhere][webrtc-everywhere], and browser support is excellent.
**Chrome**, **Firefox**, and **Opera** for Desktop and Android, as well as
**Microsoft Edge** and **Safari** have support.

You can learn more about WebRTC data channels at [HTML5Rocks][datachannel-intro].

[webrtc-everywhere]: https://speakerdeck.com/feross/webrtc-everywhere-beyond-the-browser-at-data-terra-nemo-2015
[datachannel-intro]: http://www.html5rocks.com/en/tutorials/webrtc/datachannels/

## Can WebTorrent clients connect to normal BitTorrent clients?

In the browser, WebTorrent can only download torrents that are seeded by a
WebRTC-capable torrent client.

Right now, we know of these WebRTC-capable torrent clients:

- **[WebTorrent Desktop][webtorrent-desktop]** - Open source streaming torrent client. For Mac, Windows, and Linux.
- **[Vuze][vuze-support]** - Powerful, full-featured torrent client
- **[Playback][playback]** - Open source JavaScript video player **(super cool!)**
- **[`webtorrent-hybrid`][webtorrent-hybrid]** - Node.js package (command line and API)
- **[Instant.io][instant.io]** - Simple WebTorrent client in a website
- **[βTorrent][btorrent]** - Fully-featured browser WebTorrent client ([source code][btorrent-source])
- **[TorrentMedia][torrentmedia]** - Desktop WebTorrent client
- *More coming soon – [Send a PR][pr] to add your client to the list!*

### A bit more about `webtorrent-hybrid`

In node.js, `webtorrent-hybrid` can download torrents from WebRTC peers or TCP peers
(i.e. normal peers). You can use WebTorrent as a command line program, or
programmatically as a node.js package.

To install `webtorrent-hybrid` run the following command in your terminal (add the
`-g` flag to install the command line program, omit it to install locally):

```
npm install webtorrent-hybrid -g
```

Note: If you just need to use WebTorrent in the browser (where WebRTC is available
natively) then use [`webtorrent`][webtorrent] instead, which is faster to install
because it won't need to install a WebRTC implementation.

## Can WebTorrent clients on different websites connect to each other?

Yes! **WebTorrent works across the entire web.** WebTorrent clients running on one
domain can connect to clients on any other domain. No silos!

The same-origin policy does not apply to WebRTC connections since they are not
client-to-server. Browser-to-browser connections require the cooperation of both
websites (i.e. the WebTorrent script must be present on both sites).

## Who builds WebTorrent?

WebTorrent is built by [Feross Aboukhadijeh][feross] and hundreds of open source
contributors. The WebTorrent project is managed by
[WebTorrent, LLC][webtorrent-io], as a non-profit project.

Feross's other projects include [JavaScript Standard Style][standard],
[PeerCDN][peercdn] (sold to Yahoo), [Study Notes][studynotes], and
[YouTube Instant][ytinstant].

In the past, Feross attended [Stanford University][stanford], did research in the
[Stanford Human-Computer Interaction][hci] and [Computer Security][seclab] labs,
and worked at [Quora][quora], [Facebook][facebook], and [Intel][intel].

[standard]: http://standardjs.com/
[studynotes]: https://www.apstudynotes.org/
[ytinstant]: http://ytinstant.com/
[stanford]: http://www.stanford.edu/
[hci]: http://hci.stanford.edu/
[seclab]: http://seclab.stanford.edu/
[quora]: https://www.quora.com/
[facebook]: https://www.facebook.com/
[intel]: http://intel.com/

## What is WebTorrent, LLC?

"WebTorrent, LLC" is the legal entity that owns WebTorrent. WebTorrent is, and
always will be, **non-profit, open source, and free software**.

There are no plans to make a profit from WebTorrent.

## How is WebTorrent different from PeerCDN?

[PeerCDN][peercdn] was a next-generation CDN powered by WebRTC for efficient
peer-to-peer delivery of website content. PeerCDN was founded by
[Feross Aboukhadijeh][feross], [Abi Raja][abi], and [John Hiesey][jhiesey] in
March 2013 and was sold to [Yahoo][yahoo] in December 2013.

WebTorrent is an independent project started by [Feross Aboukhadijeh][feross] in
October 2013. Unlike PeerCDN, **WebTorrent is free software**, licensed under the
[MIT License][license]. You're free to use it however you like!

> "Free software" is a matter of liberty, not price. To understand the concept, you
> should think of "free" as in "free speech," not as in "free beer."
>
> <cite>— Richard Stallman, software freedom activist</cite>

On a technical level, PeerCDN and WebTorrent were built with different goals in
mind. PeerCDN was optimized for low-latency downloads and fast peer discovery. This
meant the client and site owner trusted centralized servers to map file URLs to
content hashes.

WebTorrent, on the other hand, doesn't require clients to trust a centralized
server. Given a `.torrent` file or magnet link, the WebTorrent client downloads the
file without trusting servers or peers at any point.

[feross]: http://feross.org/
[abi]: http://abiraja.com/
[jhiesey]: https://github.com/jhiesey
[yahoo]: https://www.yahoo.com/

## How can I contribute?

WebTorrent is an **OPEN Open Source Project**. Individuals who make significant and
valuable contributions are given commit access to the project to contribute as they
see fit. (See the full [contributor guidelines][contributing].)

There are many ways to help out!

- Report bugs by [creating a GitHub issue][issues].
- Write code to [fix an open issue][open-issues].

If you're looking for help getting started, come join us in [Gitter][gitter] or on
IRC at `#webtorrent` (freenode) and how you can get started.


[open-issues]: https://github.com/webtorrent/webtorrent/issues?state=open
[contributing]: https://github.com/webtorrent/webtorrent/blob/master/CONTRIBUTING.md

## Where can I learn more?

There are many talks online about WebTorrent. Here are a few:

### Intro to BitTorrent and WebTorrent (JSConf)

<iframe width="853" height="480" src="https://www.youtube.com/embed/kxHRATfvnlw?rel=0" frameborder="0" allowfullscreen></iframe>

### WebRTC Everywhere: Beyond the Browser (slides only)

<script async class="speakerdeck-embed" data-id="cb08869f2ac2445c99e8b73a4ac65d2b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## WebTorrent supports sequential streaming. How does this affect the network?

BitTorrent clients select which file pieces to download using an algorithm called
"rarest-first". With every peer in the system trying to download the rarest pieces
first, on average most pieces will have approximately the same availability in the
network.

In practice, the rarest-first algorithm is most important on poorly-seeded
torrents, or in the first few hours of a torrent being published (when the ratio of
seeders to leechers is bad).

Most torrent clients support features that cause it to deviate from a pure rarest-
first selection algorithm. For example, the ability to select/deselect or
prioritize/deprioritize certain files in the torrent.

WebTorrent supports streaming a torrent file "in order", which is useful for
playing back media files. We’re working on improving the algorithm to switch back
to a rarest-first strategy when there is not a high-priority need for specific
pieces. In other words, when sufficient media is buffered, we can use the normal
"rarest-first" piece selection algorithm.

But the fact is that with the speed of today’s internet connections, the user is
going to finish fully downloading the torrent in a fraction of the time it takes to
consume it, so they will still spend more time seeding than downloading.

Also note: BitTorrent Inc.'s official torrent client, uTorrent, offers sequential
downloading, as well as selective file downloading, and the BitTorrent network
remains very healthy.

## Why wasn't WebTorrent designed as an entirely-new, modern protocol?

BitTorrent is the most successful, most widely-deployed P2P protocol in existence.
It works really well. Our goal with WebTorrent was to bring BitTorrent to the web
in a way that interoperates with the existing torrent network.

Re-inventing the protocol would have made WebTorrent fundamentally incompatible
with existing clients and prevented adoption. The way we've done it is better. The
wire protocol is exactly the same, but there's now a new way to connect to peers:
WebRTC, in addition to the existing TCP and uTP.

Also, re-inventing the protocol is a huge rabbit hole. There was already a lot of
risk when we started the project -- will WebRTC get adopted by all the browser
vendors? Will the Data Channel implementation stabilize and be performant? Is
JavaScript fast enough to re-package MP4 videos on-the-fly for streaming playback
with the MediaSource API? Our thinking was: Why add inventing a new wire protocol
and several algorithms to the table?

It's true that the BitTorrent protocol is dated in some ways. For example, it uses
it's own strange data encoding called "bencoding". If it were invented today, it
would probably just use JSON or MessagePack. But, this doesn't matter -- BitTorrent
works really well, and we care more about building robust and useful software than
conceptual purity or the latest software fashions.

## Is it possible to do live streaming with WebTorrent?

WebTorrent cannot do live streaming out-of-the-box, however you can build a live
streaming solution on top of WebTorrent.

Torrents are immutable. That means that once a torrent file is created, it cannot
be changed without changing the info hash. So, how could one get around this
limitation?

A naive approach would be this: The content producer could take every 10 seconds of
live content and create a torrent for it. Viewers would follow this "feed" of
torrent files (or info hashes) and download the content sequentially. Streamers
would be around 10-20 seconds behind the live stream.

This approach can definitely be improved, though! Why not give that a shot yourself
and share the code?

## Does WebTorrent leak your IP address when using a VPN? I heard that WebRTC leaks your IP address.

No.

WebRTC data channels do not allow a website to discover your public IP address when
there is a VPN in use. The WebRTC discovery process will just find your VPN's IP
address and the local network IP address.

Local IP addresses (e.g. 10.x.x.x or 192.168.x.x) can potentially be used to
"fingerprint" your browser and identify across different sites that you visit,
like a third-party tracking cookie. However, this is a separate issue than exposing
your real public IP address, and it's worth noting that the browser already
provides hundreds of vectors for fingerprinting you
(e.g. your installed fonts, screen resolution, browser window size, OS version,
language, etc.).

If you have a VPN enabled, then WebRTC data channels will not connect to peers
using your true public IP address, nor will it be revealed to the JavaScript running
on the webpage.

At one point in time, WebRTC did have an issue where it would allow a website
to discover your true public IP address, but this was fixed a long time ago. This
unfortunate misinformation keeps bouncing around the internet.

There's now a spec that defines exactly which IP addresses are exposed with WebRTC.
If you're interested in further reading, you can read the
[IP handling spec](https://tools.ietf.org/html/draft-ietf-rtcweb-ip-handling-01)
for yourself.

# Troubleshooting

## Why does browser downloading not work? I see no peers!

It does work! But you can't just use any random magnet uri or `.torrent` file. The
torrent must be seeded by a WebRTC-capable client, i.e.
[WebTorrent Desktop][webtorrent-desktop], [Vuze][vuze-support],
[webtorrent-hybrid][webtorrent-hybrid], [Playback][playback],
[instant.io][instant.io], or [βTorrent][btorrent].

In the browser, WebTorrent can only download torrents that are explicitly seeded to
web peers via a WebRTC-capable client. Desktop torrent clients need to support
WebRTC to connect to web browsers.

## Why does video/audio streaming not work?

Streaming support depends on support for `MediaSource` API in the browser. All
modern browsers have `MediaSource` support. In Firefox, support was added in
Firefox 42 (i.e. Firefox Nightly).

[Many file types][render-media] are supported (again, depending on browser support),
but only `.mp4`, `.m4v`, and `.m4a` have full support, including seeking.

To support video/audio streaming of arbitrary files, WebTorrent uses the
[`videostream`][videostream] package, which in turn uses [`mp4box.js`][mp4box.js].
If you think there may be a bug in one of these packages, please file an issue on
the respective repository.

[videostream]: https://npmjs.com/package/videostream
[mp4box.js]: https://github.com/gpac/mp4box.js

## Got more questions?

Open an issue on the WebTorrent [issue tracker][issues], or join us in
[Gitter][gitter] or on IRC at `#webtorrent` (freenode).

[webtorrent-io]: https://webtorrent.io
[render-media]: https://github.com/feross/render-media/blob/master/index.js
[gitter]: https://gitter.im/webtorrent/webtorrent
[instant.io]: https://instant.io
[issues]: https://github.com/webtorrent/webtorrent/issues
[license]: https://github.com/webtorrent/webtorrent/blob/master/LICENSE
[peercdn]: http://www.peercdn.com/
[playback]: https://mafintosh.github.io/playback/
[pr]: https://github.com/webtorrent/webtorrent
[webtorrent-hybrid]: https://npmjs.com/package/webtorrent-hybrid
[webtorrent]: https://npmjs.com/package/webtorrent
