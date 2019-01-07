const {ipcMain} = require('electron')
var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, '../database.sqlite3')
const db = new sqlite3.Database(dbPath)

ipcMain.on('get-list-barang', (event, arg) => {
  let query = 'SELECT * FROM tb_list_barang JOIN tb_barang WHERE tb_barang.barang_id = tb_list_barang.list_barang_nama ORDER BY list_barang_id DESC'
  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(result)
      event.sender.send('list-barang', result)
    }
  })
}) 

ipcMain.on('insert-list-barang', (event, arg) => {
  //console.log('data list', arg)
  let query = 'INSERT INTO tb_list_barang ('+
    'list_barang_nama, list_barang_jumlah, list_barang_satuan, '+
    'list_barang_harga_beli, list_barang_harga_jual, list_barang_harga_beli_total, '+
    'list_barang_kuota, list_barang_kategori, insert_date, update_date) VALUES (?,?,?,?,?,?,?,?,?,?)'

  db.run(query, arg, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(true)
      event.sender.send('notif-list-barang', true)
    }
  })
})

ipcMain.on('datatable-pupuk', (event, arg) => {
  //console.log(arg)
  event.sender.send('send-datatable-pupuk', arg)
})