const {ipcMain} = require('electron')
var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

//console.log('uri db', cons.uriDb)

ipcMain.on('get-barang', (event, arg) => {
  //console.log(arg)
  let query = `SELECT * FROM tb_barang`

  if (arg.category !== null) {
    query += ` WHERE barang_category = "${arg.category}"`
  }

  //console.log(query)

  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('data-barang', result)
    }
  })
})

ipcMain.on('get-barang-by-id', (event, arg) => {
  let query = `SELECT * FROM tb_barang WHERE barang_id = ${arg} `
  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('data-barang-by-id', result)
    }
  })
})

ipcMain.on('insert-barang', (event, arg) => {
  //console.log(arg)
  let query = "INSERT INTO tb_barang (barang_nama, barang_category) VALUES (?, ?)"
  db.run(query, arg, (err) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('notif-barang', true)
    }
  })
})

ipcMain.on('update-barang', (event, arg) => {
  //console.log(arg)
  let query = 'UPDATE tb_barang SET barang_nama = ?, barang_harga_jual = ?, barang_kuota = ? WHERE barang_id = ? '
  db.run(query, arg, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(result)
      event.sender.send('notif-update-barang', true)
    }
  })
})

ipcMain.on('delete-barang', (event, arg) => {
  let query = 'DELETE FROM tb_barang WHERE barang_id = ?'
  db.run(query, arg, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('notif-delete-barang', true)
    }
  })
})

ipcMain.on('edit-harga-air', (event, arg) => {
  let query = 'UPDATE tb_barang SET barang_harga_jual = ? WHERE barang_id = ?'
  db.run(query, arg, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('notif-edit-air', true)
    }
  })
})
