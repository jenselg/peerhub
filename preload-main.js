const IPFS = require('./js/ipfs.js')
const pubsub = require('./js/pubsub.js')

new IPFS.ipfsInstance()

// pubsub
ipfs.on('ready', () => {
  console.log('IPFS IS READY, CALLED FROM PRELOAD')
  pubsub.connect("#peerhub-main-channel")
})
