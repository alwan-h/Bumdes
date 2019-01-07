var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('../assets/constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

const Promise = require('bluebird')


exports.insertKonsumen = (param) => {
  let query = 'INSERT INTO tb_konsumen (konsumen_nama, konsumen_nik, barang_id, start_kuota, end_kuota) VALUES (?, ?, ?, ?, ?)'
  return new Promise((resolve, reject) => {
    db.run(query, param, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('success')
        resolve(true)
      }
    }) 
  })
}

exports.deleteKonsumen = () => {
  let nowDate = today()
  console.log('now date', nowDate)
  let query = 'DELETE FROM tb_konsumen WHERE end_kuota < ? '
  db.all(query, nowDate, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
}

function today() {
  var date = new Date(); // Now
  date.setDate(date.getDate()); // Set now + 30 days as the new date
  //console.log(date.toISOString().slice(0, 10));
  return date.toISOString().slice(0, 10)
}
