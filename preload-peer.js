//Libs
const { remote, ipcRenderer } = require('electron')
const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
const app = remote.app

// Needed data to init peer window
const peerId = remote.getGlobal('windowPeerId')
const appName = app.getName()
const peerMainFolder = path.join(app.getPath('appData'), appName, 'peerdata')
const peerDataFolder = path.join(app.getPath('appData'), appName, 'peerdata', peerId)

// Window is loaded
process.once('loaded', () => {
  if (initFolders()) {
    console.log("start!")
  }
})

// Make sure our folders are in place
var initFolders = () => {
  // Check if the peer data main folder exists
  try {
    if (!fs.existsSync(peerMainFolder)) {
      // Create the peer main folder and peer data folder since this is the first time initializing it
      fs.mkdir(peerMainFolder, {recursive: true}, () => {
        console.log('Created peerMainFolder, and...')
        fs.mkdir(peerDataFolder, {recursive: true}, () => {
          console.log('Created peerDataFolder. Ready to go!')
          return true
        })
      })
    } else {
      // Just create the peer data folder if it doesnt exist, since main folder exists
      if (!fs.existsSync(peerDataFolder)) {
        fs.mkdir(peerDataFolder, {recursive: true}, () => {
          console.log('Created peerDataFolder only!')
          return true
        })
      } else {
        console.log('Everything seems good!')
        return true
      }
    }
  } catch (err) {
    console.log(`ERROR: ${err}`)
    return false
  }
}
