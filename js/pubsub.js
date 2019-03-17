// NOTE: Implement folder/file system for storing messages; chokidar
// Folder: channel name, Sub Folder: peerId, File Name: timestamp, File Contents: data

// Used libs
const LOAD = require('./compiledlibs.js')
const Room = new LOAD.pubSubModule
const { ipcRenderer } = require('electron')

// Join a channel, then return the channel instance if subbed, else return null
var initChannel = (name) => {
  var roomInstance = Room(ipfs, name)
  var subToRoom = () => {
    roomInstance.on('subscribed', () => {
      return true
    })
  }
  if (subToRoom) {
    watchMessages(name)
    return roomInstance
  } else {
    return null
  }
}

// Available channel functions

// Leave the channel
// Unused in this context
var leaveChannel = (channel) => {
  try {
    channel.leave()
  } catch (error) {
    console.log("Couldnt leave the channel.")
  }
}

// Get channel peers
// Check if a user is online, but unused in this context
var peerList = (channel) => {
  try {
    return channel.getPeers()
  } catch (error) {
    console.log("Couldnt get channel peers.")
  }
}

// Send a message to a peer in the channel
// Chokidar to watch for new files then send
var sendMessage = (channel, peer, data) => {
  try {
    channel.sendTo(peer, data)
  } catch (error) {
    console.log("Couldnt send data to peer.")
  }
}

// Broadcast a message to the channel
// Should not be used within this app's context
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
    // When we receive a message, send a status update to indicate we received it
    // updateMessage()
    var receivedMessage = buildMessage(channel, message)
    ipcRenderer.send('receiveMessage', receivedMessage)
  })
}

// Connect to the channel and listen
var connectChannel = (channel) => {
  listenChannel(initChannel(channel))
}

// Update message status
var updateMessage = (channel, peer, data) => {

}

// Message builder, encrypt this with a keypair in the future
var buildMessage = (channel, message) => {
  var messageObject = {}
  messageObject['channel'] = channel._topic
  messageObject['from'] = message.from
  messageObject['data'] = message.data.toString()
  messageObject['timestamp'] = Date.now()
  return messageObject
}

// Watch messages, create dir if doesnt exist
var watchMessages = (channel) => {

}

module.exports = {
  initChannel,
  leaveChannel,
  peerList,
  sendMessage,
  sendBroadcast,
  listenChannel,
  connectChannel,
  updateMessage
}
