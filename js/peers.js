// TODO
// setup electron-store for multiple channels
// JSON tree for channel -> approved users


var channel = (name) => {
  const Room = require('ipfs-pubsub-room')
  var roomInstance = Room(ipfs, name)
  var subToRoom = () => {
    roomInstance.on('subscribed', () => {
      return true
    })
  }
  if (subToRoom) {
    return roomInstance
  }
}

var init = () => {
  mainChannel = channel('#peerhub-main-channel')

  if (mainChannel) {

  } else {

  }

  console.log(mainChannel)



  ipfs.id(function (err, identity) {
  if (err) {
    throw err
  }
    $("#user-id").html(identity.id)
  })
}

init()

module.exports = { init }
