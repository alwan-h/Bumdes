const {ipcMain} = require('electron')
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

// require('events').EventEmitter.defaultMaxListeners = 100;


// require('events').EventEmitter.prototype._maxListeners = 100;

ipcMain.setMaxListeners(0)

ipcMain.on('insert-penjualan', (event, arg) => {
  //console.log(arg);
  let idBarang = arg.data[2]
  let stock = arg.data[3]
  let queryStock = 'SELECT barang_stock FROM tb_barang WHERE barang_id = ?'

  db.all(queryStock, idBarang, (err, result) => {
    // console.log('stock', result)
    stock = (arg.param == 'pembelian') ? parseInt(stock) + parseInt(result[0].barang_stock) : parseInt(result[0].barang_stock - parseInt(stock))
    if (err) {
      console.log(err)
    } else {
      let query = 'INSERT INTO tb_penjualan (penjualan_nama, penjualan_nik,'+ 
        'penjualan_nama_barang, penjualan_jumlah_barang, penjualan_harga_barang, penjualan_satuan_barang, '+
        'penjualan_metode_pembayaran, penjualan_status_pembayaran, penjualan_insert_tanggal) '+
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      db.run(query, arg.data, (err, result) => {
        
        if (err) {
          console.log(err)
          
        } else {
          if (idBarang != 5) {
            let queryUpdateStock = 'UPDATE tb_barang SET barang_stock = ? WHERE barang_id = ?'
            db.run(queryUpdateStock, [stock, idBarang], (err, result) => {
              if (err) {
                console.log(err)
              }
            })
          }
          
          event.sender.send('notif-penjualan', true)  
        }
        
      })
    }
  })
  
  
})

ipcMain.on('get-penjualan', (event, arg) => {
  let query = `SELECT * FROM tb_penjualan JOIN tb_barang, tb_metode_pembayaran WHERE tb_penjualan.penjualan_nama_barang = tb_barang.barang_id AND tb_metode_pembayaran.metode_id = tb_penjualan.penjualan_metode_pembayaran ORDER BY tb_penjualan.penjualan_id DESC`
  if (arg.byId != null) {
    query += ` WHERE penjualan_id = ${arg.byId}`
  }

  // if (arg.byCategory != null) {
  //   query += ` WHERE penjualan_id = ${arg.byId}`
  // }

  // event.sender.setMaxListeners(100)

  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('listener data penjualan')
      
      event.sender.send('data-penjualan', result)
      //emitter.removeAllListeners('data-penjualan')
    }
  })
})

ipcMain.on('data-total-penjualan', (event, arg) => {
  let query = 'select tb_kategori.kategori_id, tb_kategori.kategori_nama, sum(penjualan_jumlah_barang) as total_penjualan  from tb_penjualan join tb_barang, tb_kategori where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_kategori.kategori_id = tb_barang.barang_category group by tb_barang.barang_category'
  db.all(query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(result);
      event.sender.send('total-penjualan', result)
    }
  })
})