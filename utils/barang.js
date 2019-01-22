var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

const Promise = require('bluebird')

exports.insertBarang = (arg) => {
  let query = "INSERT INTO tb_barang (barang_nama, barang_category, barang_harga_jual, barang_kuota, barang_stock) VALUES (?, ?, 0, 0, 0)"
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

exports.getBarang = (arg) => {
  let query = `SELECT * FROM tb_barang`
  if (arg.category != null) {
    query += ` WHERE barang_category = "${arg.category}"`
  }
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.log('Error running sql: ' + sql)
        console.log(err)
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

exports.getBarangById = (arg) => {
  let query = `SELECT * FROM tb_barang WHERE barang_id = ${arg} `
  
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        //event.sender.send('data-barang-by-id', result)
        resolve(result)
      }
    })
  })
}

exports.updateBarang = (arg) => {
  let query = 'UPDATE tb_barang SET barang_nama = ?, barang_harga_jual = ?, barang_kuota = ? WHERE barang_id = ? '
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        //console.log(result)
        //event.sender.send('notif-update-barang', true)
        resolve(true)
      }
    })
  })
}

exports.getStock = () => {
  let query = 'SELECT SUM(barang_stock) as stock FROM tb_barang WHERE barang_category = 1'
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

exports.updateHargaAir = (arg) => {
  let query = 'UPDATE tb_barang SET barang_harga_jual = ? WHERE barang_id = ?'
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        //event.sender.send('notif-edit-air', true)
        resolve(true)
      }
    })
  })
}