const remote = require('electron').remote
//const main = remote.require('./main.js')
//const {ipcRender} = require('electron')
var userLevel = sessionStorage.getItem('user_level')
//console.log('user level', userLevel)

document.title = userLevel
$('#user_level').text(userLevel)

//ipcRender.send('user-level')
// ipcRender.on('user-level', (event, arg) => {
//   console.log('user level', arg)
//   document.title = arg
//   $('#user_level').text(arg)
// })

let monitorWidth = remote.screen;
console.log(monitorWidth.getPrimaryDisplay());
// const { width, height } = monitorWidth.getPrimaryDisplay().workAreaSize

// let screenCenterX = width / 2
// let screenCenterY = height / 2

let screenWidth = monitorWidth.getPrimaryDisplay().size.width
let screenHeight = monitorWidth.getPrimaryDisplay().size.height

let screenCenterX = screenWidth / 2
let screenCenterY = screenHeight / 2



let mainWindow = remote.getCurrentWindow()

let wWidth = 1240
let wHeight = 700

let wX = screenCenterX - (wWidth/2)
let wY = screenCenterY - (wHeight/2)

mainWindow.setBounds({
  width: wWidth,
  height: wHeight,
  x: wX,
  y: wY
})
