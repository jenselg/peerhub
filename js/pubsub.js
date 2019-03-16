// NOTE: Implement folder/file system for storing messages; chokidar

// Used libs
const LOAD = require('./compiledlibs.js')
const Room = new LOAD.pubSubModule

// Join a channel, then return the channel instance if subbed, else return null
var initChannel = (name) => {
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

// Process messages; store messages inside appdata, peer id as folder names, and messages as texts or files
var listenChannel = (channel) => {
  channel.on('message', (message) => {
    var messageObject = {}
    messageObject['from'] = message.from
    messageObject['channel'] = channel._topic
    messageObject['data'] = message.data.toString()
    messageObject['timestamp'] = Date.now()
    console.log(JSON.stringify(messageObject))
    return messageObject
  })
}

// Connect to the channel and listen
var connectChannel = (channel) => {
  listenChannel(initChannel(channel))
}

module.exports = { initChannel, leaveChannel, peerList, sendMessage, sendBroadcast, listenChannel, connectChannel }
