// Check whether we're in node or renderer
if ((process && process.type === 'renderer')) {
  const { ipcRenderer } = require('electron')
  module.exports = {}
} else {
  const { ipcMain } = require('electron')
  module.exports = {}
}

// RENDERER FUNCTIONS

var sendData = (eventName, data) => {
  ipcRenderer.send(eventName, data)
}

var listenData = (eventName) => {
  remote.getGlobal( 'peerId' )
}

// NODE FUNCTIONS

var bridgeData = (eventName, windowVar) => {
  ipcMain.on(eventName, (event, data) => {
    global.queryData[eventName] = data
  })
}










const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});
