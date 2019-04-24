window.$ = window.jquery = require("jquery")
window.popper = require("popper.js")
require("bootstrap")

// Loading
$("#peer-window").load('./html/loading.html')

// UI
$(window).ready(() => {
    $("#peer-window").load('./html/peer-window.html')
})
