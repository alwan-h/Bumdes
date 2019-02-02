const remote = require("electron").remote;
//const main = remote.require('./main.js')
//const {ipcRender} = require('electron')
var userLevel = sessionStorage.getItem("user_level");
//console.log('user level', userLevel)
var userUsername = sessionStorage.getItem("user_username");

document.title = userLevel;
$("#user_level").text(userUsername);

if (userLevel == "Admin") {
  $("#li-kasir").hide();
  $("#li-gudang").hide();
} else if (userLevel == "Gudang") {
  $("#li-pupuk").hide();
  $("#li-kasir").hide();
  $("#li-konsumen").hide();
  $("#li-pengguna").hide();
  $("#li-air").hide();
} else if (userLevel == "Kasir") {
  $("#li-pupuk").hide();
  $("#li-gudang").hide();
  $("#li-pengguna").hide();
  $("#li-air").hide();
}

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

let screenWidth = monitorWidth.getPrimaryDisplay().size.width;
let screenHeight = monitorWidth.getPrimaryDisplay().size.height;

let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;

let mainWindow = remote.getCurrentWindow();

let wWidth = screenWidth;
let wHeight = screenHeight;

let wX = screenCenterX - wWidth / 2;
let wY = screenCenterY - wHeight / 2;

mainWindow.setBounds({
  width: wWidth,
  height: wHeight,
  x: wX,
  y: wY
});
