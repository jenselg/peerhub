// Used libs
const LOAD = require('./compiledlibs.js')
const Room = new LOAD.pubSubModule
const { ipcRenderer } = require('electron')

// Connect to the channel and listen
var connect = (name) => {
  var channel = Room(ipfs, name)
  channel.on('subscribed', () => {
    console.log(`Subscribed to: ${name}`)
    channel.on('message', (data) => {
      // message is an object; {"from":peerid, "data":buffer}
      // call ipcRenderer receiveMessage
      ipcRenderer.send('receiveMessage', data)
    })
    // listen for ipcRenderer sendMessage, then do:
    // channel.sendTo(peer, message)
  })
}

module.exports = {
  connect
}
