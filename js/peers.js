const Store = require('electron-store')
const store = new Store({ name: 'peerhub-peers' })

var channel = (name) => {
  const Room = require('ipfs-pubsub-room')
  var roomInstance = Room(ipfs, name)
  var subToRoom = () => {
    roomInstance.on('subscribed', () => {
      return true
    })
  }
  if (subToRoom) {
    return roomInstance
  }
}

var channelPeerList = () => {
  // load peer list from local store; fire a has peer on init
  // on peer join and leave, update front-end
}

var initMessages = () => {
  // load messages onto messages-container onClick of peer, from local store
}

var sendMessage = () => {
  // append message to messages-container then send to peer; store in local store
}

var receiveMessage = () => {
  // append message to messages-container; store in local store
}

var init = () => {
  mainChannel = channel('#peerhub-main-channel')

  if (mainChannel) {

  } else {

  }
  ipfs.id(function (err, identity) {
  if (err) {
    throw err
  }
    $("#user-id").html(identity.id)
  })
}

init()

module.exports = { init }
