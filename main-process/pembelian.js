const {ipcMain} = require('electron')
var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

ipcMain.on('insert-pembelian', (event, arg) => {
  // console.log(arg)
  let idBarang = arg.data[0]
  let stock = arg.data[3]
  let queryStock = 'SELECT barang_stock FROM tb_barang WHERE barang_id = ?'
  db.all(queryStock, idBarang, (err, result) => {
    // console.log('stock', result)
    stock = (arg.param == 'pembelian') ? parseInt(stock) + parseInt(result[0].barang_stock) : parseInt(stock) - parseInt(result[0].barang_stock)
    if (err) {
      console.log(err)
    } else {
      let query = 'INSERT INTO tb_pembelian (pembelian_nama, pembelian_kategori, pembelian_satuan, pembelian_jumlah, pembelian_harga, pembelian_harga_total , pembelian_tanggal) VALUES (?,?,?,?,?,?,?)'
      db.run(query, arg.data, (err) => {
        if (err) {
          console.log(err)
        } else {

          let queryUpdateStock = 'UPDATE tb_barang SET barang_stock = ? WHERE barang_id = ?'
          db.run(queryUpdateStock, [stock, idBarang], (err, result) => {
            if (err) {
              console.log(err)
            }
          })
          event.sender.send('notif-insert-pembelian', true)
        }
      })
    }
  })
  
})

ipcMain.on('get-pembelian', (event, arg) => {
  let query = 'SELECT * FROM tb_pembelian JOIN tb_barang WHERE tb_barang.barang_id = tb_pembelian.pembelian_nama ORDER BY tb_pembelian.pembelian_id DESC'
  
  if (arg.parameter.byId == true) {
    query += ` WHERE pembelian_id = "${arg.data.id}"`
  }

  if (arg.parameter.byName == true) {
    query += ` WHERE pembelian_nama = "${arg.data.nama}"`
  }

  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(result);
      event.sender.send('send-pembelian', result)
    }
  })
})

ipcMain.on('data-total-pembelian', (event, arg) => {
  let query = 'SELECT SUM(pembelian_jumlah) as total_pembelian FROM tb_pembelian'
  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(result);
      event.sender.send('total-pembelian', result)
    }
  })
})
