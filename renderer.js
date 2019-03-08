// Front-End Libraries
window.$ = window.jquery = require("jquery")
window.popper = require("popper.js")
require("bootstrap")

// Loading
$("#main-window").load('./html/loading.html')

// IPFS
const IPFS = require('./js/ipfs.js')
new IPFS.ipfsInstance()

// UI
$(window).ready(() => {
  ipfs.on('ready', (err, info) => {
    if (!err) {
      $("#main-window").load('./html/main-window.html')
    } else {
      $("#main-window").load('./html/error.html')
    }
  })
})
