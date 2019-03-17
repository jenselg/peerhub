const pubsub = require('./pubsub.js')
const { remote, ipcRenderer } = require('electron')
const BrowserWindow = remote.BrowserWindow;
const path = require('path')

var init = () => {
  pubsub.connectChannel("#peerhub-main-channel")
}

$("#open-window").on('click', () => {
  ipcRenderer.send('createPeerWindow', 'testpeerid')
})

init()
