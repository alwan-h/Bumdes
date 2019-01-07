// var sqlite3 = require('sqlite3').verbose();

// const path = require('path')
// const dbPath = path.resolve(__dirname, '../database.sqlite3')
// const db = new sqlite3.Database(dbPath)
 
//db.serialize(function() {
  // db.run("CREATE TABLE IF NOT EXISTS tb_user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_level TEXT, user_password TEXT)");

  // db.all("SELECT * FROM tb_user", (err, result) => {
  //   if(err) {
  //     console.log(err)
  //   } else {
  //     console.log(result)
  //     // if (result.length <= 0) {
  //     //   db.run("INSERT INTO tb_user (user_id, user_level, user_password) VALUES ( null, 'Admin', '12345'), (null, 'Gudang', '12345'), (null, 'Kasir', '12345')")
  //     // }
  //   }
  // })
  
  // db.run('INSERT INTO tb_user (user_level, user_password) VALUES(?, ?)', ['Admin', '12345'], (err) => {  
  //   if (err) {
  //     console.log('ERROR!', err)
  //   }
  // })

  // db.run("CREATE TABLE IF NOT EXISTS tb_barang (info TEXT)");
  // db.run("CREATE TABLE IF NOT EXISTS tb_list_barang (info TEXT)");
  // db.run("CREATE TABLE IF NOT EXISTS tb_transaksi (info TEXT)");
 
//});
 
//db.close()