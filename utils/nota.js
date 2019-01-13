var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)
const Promise = require('bluebird')

exports.insertNota = (arg) => {
  let query = 'INSERT INTO tb_nota (penjualan_id, total_harga, dibayar_sekarang, sudah_dibayar, tanggal_pembayaran) VALUES (?, ?, ?, ?, ?)'
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

exports.getNota = () => {
  let query = 'SELECT * FROM tb_nota'
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}