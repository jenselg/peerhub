const pubsub = require('./pubsub.js')
const { remote, ipcRenderer } = require('electron')
const BrowserWindow = remote.BrowserWindow;
const path = require('path')

var init = () => {
  pubsub.connectChannel("#peerhub-main-channel")
}

var openPeerWindow = (peer) => {
  ipcRenderer.send( "peerId", peer )
  var peerWindow
  // Create the browser window.
  peerWindow = new BrowserWindow({
    width: 640,
    height: 480,
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'peer-window.js')
    }
  })
  // and load the index.html of the app.
  peerWindow.loadFile('./html/peer-window.html')

  // Open the DevTools.
  peerWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  peerWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    peerWindow = null
  })
}

$("#open-window").on('click', () => {
  openPeerWindow("testpeerid")
})

init()
