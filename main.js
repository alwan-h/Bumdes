const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')

//require('events').EventEmitter.defaultMaxListeners = 0;
// Emitter.defaultMaxListeners = 100;

//emitter.setMaxListeners(0)

// require('events').EventEmitter.prototype._maxListeners = 100;

//process.setMaxListeners(0)
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let userLevel


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('index.html')
  //win.loadFile('./subpages/pdf-gudang.html')

  ///const ses = win.webContents.session
  //console.log(ses.getUserAgent())

  //let sqlite = require('./storage/storage.js')
  loadDemos()
  //let getData = require('./storage/get-data.js')
  //getData.getAll

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function loadDemos () {
  const files = glob.sync(path.join(__dirname, 'main-process/*.js'))
  files.forEach((file) => { require(file) })
}

exports.setUserLevel = (namaUser) => {
  userLevel = namaUser
}

exports.getUserLevel = () => {
  return userLevel
}
