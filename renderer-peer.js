// Front-End Libraries
const { ipcRenderer } = require('electron')
window.$ = window.jquery = require("jquery")
window.popper = require("popper.js")
require("bootstrap")

// Loading
$("#peer-window").load('./html/loading.html')

// UI
$(window).ready(() => {
    $("#peer-window").load('./html/peer-window.html')
})

var init = () => {
  ipcRenderer.send('windowReady', true)
  ipcRenderer.on('receiveMessage', (event, data) => {
      console.log(data)
  })
}
