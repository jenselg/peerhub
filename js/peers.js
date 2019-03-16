pubsub = require('./pubsub.js')

var init = () => {
  mainChannel = pubsub.joinChannel('#peerhub-main-channel')
}

init()
