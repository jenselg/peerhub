// NOTE: Implement folder/file system for storing messages; chokidar
// Folder: channel name, Sub Folder: peerId, File Name: timestamp, File Contents: data

// Used libs
const LOAD = require('./compiledlibs.js')
const Room = new LOAD.pubSubModule
const { remote, ipcRenderer } = require('electron')

// Connect to the channel and listen
var connect = (name) => {
  var channel = Room(ipfs, name)
  channel.on('subscribed', () => {
    console.log(`Subscribed to: ${name}`)
  })
}

module.exports = {
  connect
}
