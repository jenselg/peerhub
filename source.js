function ipfsModule () {
  return require('ipfs')
}

function pubSubModule () {
  return require('ipfs-pubsub-room')
}

module.exports = { ipfsModule, pubSubModule }
