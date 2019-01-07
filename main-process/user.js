const {ipcMain} = require('electron')
var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

ipcMain.on('get-user', (event, arg) => {
  //console.log(arg)
  let query = "SELECT * FROM tb_user WHERE user_level = ? AND user_password = ?"
  db.all(query, arg, (err, result) => {
    if (err) {
      console.log(err)
    } else if (result.length == 1) {
      //console.log('user level main',result[0])
      userLevel = result[0].user_level
      //console.log(userLevel)
      event.sender.send('data-user', result)
    }
  })
})

ipcMain.on('get-all-user', (event, arg) => {
  //console.log(arg)
  let query = "SELECT * FROM tb_user"
  db.all(query, arg, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(result)
      event.sender.send('data-all-user', result)
    }
  })
})

ipcMain.on('update-user', (event, arg) => {
  //console.log(arg)
  let query = "UPDATE tb_user SET user_password=? WHERE user_id=? "
  db.run(query, arg, (err) => {
    console.log(err)
    if (!err) {
      event.sender.send('data-update-user', true)
    }
  })
})

ipcMain.on('delete-user', (event, arg) => {

})