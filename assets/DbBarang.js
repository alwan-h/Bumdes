var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const cons = require('./constanta.js')
const dbPath = path.resolve(__dirname, cons.uriDb)
const db = new sqlite3.Database(dbPath)

const Promise = require('bluebird')

class DbBarang {  
  // constructor(dbFilePath) {
  //   this.db = new sqlite3.Database(dbFilePath, (err) => {
  //     if (err) {
  //       console.log('Could not connect to database', err)
  //     } else {
  //       console.log('Connected to database')
  //     }
  //   })
  // }
  constructor() {
    console.log('constructor');
    
  }

  getBarang() {
    console.log('get barang')
  }

  insertBarang() {
    console.log('insert barang')
  }
}

module.exports = DbBarang  