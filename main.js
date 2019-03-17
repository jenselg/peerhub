const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
let mainWindow
let peerWindow = {}

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 600,
    minWidth: 320,
    minHeight: 600,
    maxWidth: 320,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload-main.js')
    }
  })
  mainWindow.loadFile('main.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createPeerWindow (peerName, data) {
  global.windowPeerId = peerName
  peerWindow[peerName] = new BrowserWindow({
    width: 640,
    height: 480,
    minWidth: 640,
    minHeight: 480,
    title: peerName,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload-peer.js')
    }
  })
  peerWindow[peerName].loadFile('peer.html')
  peerWindow[peerName].webContents.openDevTools()
  peerWindow[peerName].on('closed', function () {
    peerWindow[peerName] = null
  })
  if (data) {
    peerWindow[peerName].once('ready-to-show', () => {
      peerWindow[peerName].webContents.send('receiveMessage', data)
    })
  }
}

ipcMain.on('createPeerWindow', (event, peerName) => {
  createPeerWindow(peerName)
})

ipcMain.on('windowReady', (event, bool) => {

})

ipcMain.on('receiveMessage', (event, data) => {
  // Check if peer window exists, if not, make it
  if (peerWindow[data.from]) {
    peerWindow[data.from].webContents.send('receiveMessage', data)
  } else {
    createPeerWindow(data.from, data)
  }
})

ipcMain.on('sendMessage', (event, data) => {
  mainWindow.webContents.send('sendMessage', data)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})
