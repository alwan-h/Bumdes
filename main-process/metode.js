const {ipcMain} = require('electron')
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

ipcMain.on('get-metode', (event, arg) => {
  let query = 'SELECT * FROM tb_metode_pembayaran'
  db.all(query, (err, result) => {
    console.log(result)
    if (err) {
      console.log(err)
    } else {
      event.sender.send('data-metode', result  )
    }
  })
})
