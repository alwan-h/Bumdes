var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)
const konsumen = require('./konsumen.js')
const nota = require('./nota')

const Promise = require('bluebird')

exports.insertPenjualan = (arg) => {
  console.log(arg.data)
  let idBarang = arg.data[2]
  let stock = arg.data[3]
  let queryStock = 'SELECT barang_stock FROM tb_barang WHERE barang_id = ?'
  arg.data[8] = today(0)
  let startDate = today(0)
  let endDate = today(30)
  var param = {nama: arg.data[0], nik: arg.data[1], barangId: arg.data[2], startDate: startDate, endDate: endDate}

  return new Promise((resolve, reject) => {

    //insertKonsumen(param).then(() => {
      db.all(queryStock, idBarang, (err, result) => {
        // console.log('stock', result)
        stock = (arg.param == 'pembelian') ? parseInt(stock) + parseInt(result[0].barang_stock) : parseInt(result[0].barang_stock - parseInt(stock))
        if (err) {
          console.log(err)
        } else {
          let query = 'INSERT INTO tb_penjualan (penjualan_nama, penjualan_nik,'+ 
            'penjualan_nama_barang, penjualan_jumlah_barang, penjualan_harga_barang, penjualan_satuan_barang, '+
            'penjualan_metode_pembayaran, penjualan_status_pembayaran, penjualan_insert_tanggal, penjualan_total_bayar) '+
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
          db.run(query, arg.data, (err, result) => {
            
            if (err) {
              console.log(err)
              reject(err)
            } else {
              getLastId().then(id => {

                // nota.insertNota(dataNota).then(() => {
                  
                // })
                if (idBarang != 5) {
                  let queryUpdateStock = 'UPDATE tb_barang SET barang_stock = ? WHERE barang_id = ?'
                  db.run(queryUpdateStock, [stock, idBarang], (err, result) => {
                    if (err) {
                      console.log(err)
                    } else {
                      insertKonsumen(param)
                      resolve(id)
                    }
                  })
                } else {
                  resolve(id)
                } 

              })
              
            }
            
          })
        }
      })
    //})
  })
}

exports.getPenjualan = (arg) => {
  let query = `SELECT * FROM tb_penjualan JOIN tb_barang, tb_metode_pembayaran WHERE tb_penjualan.penjualan_nama_barang = tb_barang.barang_id AND tb_metode_pembayaran.metode_id = tb_penjualan.penjualan_metode_pembayaran`
  if (arg.byId != null) {
    query += ` AND penjualan_id = ${arg.byId}`
  }

  if (arg.byCategory != null) {
    query += ` AND tb_barang.barang_category = ${arg.byCategory}`
  }

  if (arg.byNik != null) {
    query += ` AND tb_penjualan.penjualan_nik = "${arg.byNik}"`
  }

  if (arg.byStatus != null) {
    query += ` AND tb_penjualan.penjualan_status_pembayaran = "${arg.byStatus}"`
  }
  // event.sender.setMaxListeners(100)

  query += ' ORDER BY date(tb_penjualan.penjualan_insert_tanggal) DESC, penjualan_id DESC'

  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('listener data penjualan')
        resolve(result)
        //event.sender.send('data-penjualan', result)
        //emitter.removeAllListeners('data-penjualan')
      }
    })
  })
}

exports.getPenjualanByNik = (arg) => {
  let query = `SELECT tb_barang.barang_id, tb_barang.barang_nama, SUM(tb_penjualan.penjualan_jumlah_barang) as total_beli, tb_penjualan.penjualan_insert_tanggal, MIN(tb_penjualan.penjualan_id), tb_barang.barang_kuota, tb_konsumen.end_kuota FROM tb_penjualan JOIN tb_barang, tb_metode_pembayaran, tb_konsumen WHERE tb_penjualan.penjualan_nama_barang = tb_barang.barang_id AND tb_metode_pembayaran.metode_id = tb_penjualan.penjualan_metode_pembayaran AND tb_barang.barang_category = 1 AND tb_konsumen.barang_id = tb_penjualan.penjualan_nama_barang AND tb_penjualan.penjualan_nik = "${arg.nik}" GROUP BY tb_penjualan.penjualan_nama_barang`
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('listener data penjualan')
        resolve(result)
      }
    })
  })
}

exports.getPenjualanByBarang = (arg) => {
  let query = `SELECT * FROM tb_penjualan WHERE penjualan_status_pembayaran = "Belum" AND penjualan_nama_barang = ?`
  return new Promise((resolve, reject) => {
    db.all(query, arg, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

exports.totalPenjualan = () => {
  let query = 'select tb_kategori.kategori_id, tb_kategori.kategori_nama, sum(penjualan_jumlah_barang) as total_penjualan  from tb_penjualan join tb_barang, tb_kategori where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_kategori.kategori_id = tb_barang.barang_category group by tb_barang.barang_category'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        // console.log(result);
        //event.sender.send('total-penjualan', result)
        resolve(result)
      }
    })
  })
}

exports.updatePenjualan = (arg) => {
  let query = 'UPDATE tb_penjualan SET penjualan_total_bayar = ?, penjualan_status_pembayaran = ?, penjualan_insert_tanggal = ? WHERE penjualan_id = ?'
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        //getLastId().then(id => {
          resolve(true)
        //})
      }
    })
  })
}

exports.grafikPenjualanPupuk = (arg) => {
  //let query = `select strftime("%m", penjualan_insert_tanggal) as bulan_masuk from tb_penjualan where strftime("%Y", penjualan_insert_tanggal) = "${arg}" group by bulan_masuk`
  let query = `select strftime("%m", penjualan_insert_tanggal) as bulan_masuk,  tb_barang.barang_nama, sum(tb_penjualan.penjualan_jumlah_barang) as jumlah from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_barang.barang_category = 1 and strftime("%Y", penjualan_insert_tanggal) = "${arg}" group by bulan_masuk`
  //let query = 'select strftime("%m", penjualan_insert_tanggal) as bulan_masuk,  tb_barang.barang_nama, sum(tb_penjualan.penjualan_jumlah_barang) as jumlah from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_barang.barang_category = 1 and strftime("%Y", penjualan_insert_tanggal) = "2019" group by bulan_masuk'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.grafikPenjualanAir = (arg) => {
  let query = `select strftime("%m", penjualan_insert_tanggal) as bulan_masuk,  tb_barang.barang_nama, sum(tb_penjualan.penjualan_jumlah_barang) as jumlah from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_barang.barang_category = 2 and strftime("%Y", penjualan_insert_tanggal) = "${arg}" group by bulan_masuk`
  //let query = 'select strftime("%m", penjualan_insert_tanggal) as bulan_masuk,  tb_barang.barang_nama, sum(tb_penjualan.penjualan_jumlah_barang) as jumlah from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_barang.barang_category = 1 and strftime("%Y", penjualan_insert_tanggal) = "2019" group by bulan_masuk'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.grafikTransaksi = (arg) => {
  let query = `select strftime("%m", penjualan_insert_tanggal) as bulan_transaksi,  count(*) as jumlah_transaksi from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and strftime("%Y", penjualan_insert_tanggal) = "${arg}" group by bulan_transaksi`
  //let query = 'select strftime("%m", penjualan_insert_tanggal) as bulan_masuk,  tb_barang.barang_nama, sum(tb_penjualan.penjualan_jumlah_barang) as jumlah from tb_penjualan join tb_barang where tb_barang.barang_id = tb_penjualan.penjualan_nama_barang and tb_barang.barang_category = 1 and strftime("%Y", penjualan_insert_tanggal) = "2019" group by bulan_masuk'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.getTotalPiutang = () => {
  let query = 'SELECT COUNT(*) as bon FROM tb_penjualan WHERE penjualan_status_pembayaran = "Belum"'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
 
function insertKonsumen(param) {

  let query = `SELECT * FROM tb_konsumen WHERE konsumen_nik = "${param.nik}" AND barang_id = ${param.barangId}`
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        if (result.length == 0) {
          var data = [param.nama, param.nik, param.barangId, param.startDate, param.endDate]
          konsumen.insertKonsumen(data).then(b => {
            if (b) {
              resolve(true)
            }
          })
          
        }
      }
    })
  })
}

function today(addDay) {
  var date = new Date(); // Now
  date.setDate(date.getDate() + addDay); // Set now + 30 days as the new date
  //console.log(date.toISOString().slice(0, 10));
  return date.toISOString().slice(0, 10)
}

function getLastId() {
  let query = 'SELECT penjualan_id FROM tb_penjualan ORDER BY penjualan_id DESC limit 1'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('last id', result[0].penjualan_id)
        resolve(result[0].penjualan_id)
      }
    })
  })
}
