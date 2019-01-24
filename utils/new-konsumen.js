var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

const Promise = require('bluebird')

exports.insertKonsumen = (arg) => {
  let query = 'INSERT INTO tb_new_konsumen (nik, nama, kelompok_tani, nama_desa, luas_lahan, UREA, SP_36, NPK, ZA, Organik) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
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

exports.getKonsumen = (arg) => {
  let query = 'SELECT * FROM tb_new_konsumen '
  if (arg.nik != null) {
    query += `WHERE nik = ${arg.nik}`
  }
  query += ' ORDER BY konsumen_id DESC'
  return new Promise((resolve, reject) => {
    db.all(query, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}