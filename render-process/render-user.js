const remote = require('electron').remote
//const main = remote.require('./main.js')
const {ipcRenderer} = require('electron')
//const ses = remote.session

let monitorWidth = remote.screen;

let screenWidth = monitorWidth.getPrimaryDisplay().size.width
let screenHeight = monitorWidth.getPrimaryDisplay().size.height

let screenCenterX = screenWidth / 2
let screenCenterY = screenHeight / 2

let mainWindow = remote.getCurrentWindow()
//let mainBounds = mainWindow.getBounds()
//console.log(screenElectron.getPrimaryDisplay())

let wWidth = 800
let wHeight = 600

let wX = screenCenterX - (wWidth/2)
let wY = screenCenterY - (wHeight/2)

mainWindow.setBounds({
  width: wWidth,
  height: wHeight,
  x: wX,
  y: wY
})


$(document).ready(function() {
  var level = $('#user_level')
  var password = $('#user_password')
  var submit = $('#user_login')

  submit.click(function(e) {
    e.preventDefault()
    //console.log('login')
    if (password.length !== 0) {
      ipcRenderer.send('get-user', [level.val(), password.val()])
      ipcRenderer.on('data-user', (event, arg) => {
        //console.log(arg)
        if (arg.length == 1) {
          //console.log(arg)
          // main.setUserLevel() = arg[0].user_level
          //const ses = session.fromPartition('persist:name')
          sessionStorage.setItem('user_level', arg[0].user_level)
          console.log(sessionStorage.getItem('user_level'))
          window.location.href = 'mainwindow.html'
        }
      })
    }
  })
})
