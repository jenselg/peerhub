//Libs
const { remote, ipcRenderer } = require('electron')
const windowId = remote.getCurrentWindow().id
window.$ = window.jquery = require("jquery")
window.popper = require("popper.js")
require("bootstrap")

// Loading
$("#peer-window").load('./html/loading.html')

// UI
$(window).ready(() => {
    $("#peer-window").load('./html/peer-window.html')
})

// Loaded on start
var init = () => {
  tempDataCapture()
  ipcRenderer.on('receiveMessage', (event, data) => {
      console.log(data)
  })
}

// Capture init data when a user sends a message
var tempDataCapture = () => {
  try {
    var tempData = remote.getGlobal('tempData')[windowId]
    console.log(JSON.stringify(tempData))
    ipcRenderer.send('clearTempData', windowId)
  } catch (err) {
    console.log('No temp data!')
  }
}

init()
