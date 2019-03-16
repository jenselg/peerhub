// Used libs
const LOAD = require('./compiledlibs.js')
const Room = new LOAD.pubSubModule

// Join a channel, then return the channel instance if subbed, else return null
var joinChannel = (name) => {
  var roomInstance = Room(ipfs, name)
  var subToRoom = () => {
    roomInstance.on('subscribed', () => {
      return true
    })
  }
  if (subToRoom) {
    return roomInstance
  } else {
    return null
  }
}

// Available channel functions

// Leave the channel
var leaveChannel = (channel) => {
  try {
    channel.leave()
  } catch (error) {
    console.log("Couldnt leave the channel.")
  }
}

// Get channel peers
var peerList = (channel) => {
  try {
    return channel.getPeers()
  } catch (error) {
    console.log("Couldnt get channel peers.")
  }
}

// Send a message to a peer in the channel
var sendMessage = (channel, peer, data) => {
  try {
    channel.sendTo(peer, data)
  } catch (error) {
    console.log("Couldnt send data to peer.")
  }
}

// Broadcast a message to the channel
var sendBroadcast = (channel, data) => {
  try {
    channel.broadcast(data)
  } catch (error) {
    console.log("Couldnt send broadcast.")
  }
}

module.exports = { joinChannel, leaveChannel, peerList, sendMessage, sendBroadcast }
