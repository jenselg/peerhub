module.exports = { ipfsInstance }

const Store = require('electron-store')
const store = new Store({ name: 'ipfs-instance' })

const LOAD = require('./compiledlibs.js')
const IPFS = new LOAD.ipfsModule

function genRepoPath () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  var path = 'peerhub-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  console.log(`Generated repo path: ${path}`)
  return path
}

function getRepoPath () {
  if (store.has('repo')) {
    console.log(`"repo" key exists with value of: ${store.get('repo')}`)
    return store.get('repo')
  } else {
    return undefined
  }
}

function setRepoPath (path) {
  store.set('repo', path)
  console.log(`Repo path saved to key "repo" with a value of:`)
  console.log(store.get('repo'))
}

function ipfsInstance () {
  var repo = getRepoPath()
  console.log("ipfsInstance called!")
  console.log(`Repo argument value: ${repo}`)
  console.log("-------------------------")
  if (!repo) {
    // Repo path is not defined
    repo = genRepoPath()
    console.log("Repo path is not defined!")
    console.log(`Create new repo at: ${repo}`)
    console.log("-------------------------")
    try {
      console.log(`Starting IPFS instance at ${repo}`)
      ipfs = new IPFS({
        repo: repo,
        EXPERIMENTAL: {
          pubsub: true
        },
        config: {
          Addresses: {
            Swarm: [
              '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
          }
        }
      })
      console.log("-------------------------")
      var actualPath = ipfs.repo.path((path) => { return path })
      setRepoPath(actualPath)
    } catch (error) {
      console.log("Failed to start IPFS with a new repo!")
      console.log("See errors below:")
      console.log(error)
    }

  } else {
    // Repo path is defined
    console.log(`Repo path: "${repo}"`)
    console.log("NOTE: If this repo path is invalid there might be errors!")
    console.log("-------------------------")
    try {
      console.log(`Starting IPFS instance at "${repo}"; init flag set to false`)
      ipfs = new IPFS({
        init: false,
        repo: repo,
        EXPERIMENTAL: {
          pubsub: true
        },
        config: {
          Addresses: {
            Swarm: [
              '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
          }
        }
      })
      var actualPath = ipfs.repo.path((path) => { return path })
      var settedPath = getRepoPath()
      if (actualPath === settedPath) {
        console.log(`IPFS Path: ${actualPath}`)
        console.log(`DB Path: ${settedPath}`)
        console.log("Repo's match!")
      } else {
        console.log("Repo values do not match! DEBUG!")
      }
    } catch (error) {
      console.log("Failed to start IPFS while repo is defined!")
      console.log("See errors below:")
      console.log(error)
    }
  }
}
