var sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cons = require("../assets/constanta.js");
const dbPath = path.resolve(__dirname, cons.uriDb);
const db = new sqlite3.Database(dbPath);
const Promise = require("bluebird");

exports.insertNota = arg => {
  let query =
    "INSERT INTO tb_nota (penjualan_id, total_harga, dibayar_sekarang, sudah_dibayar, tanggal_pembayaran) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

exports.getNota = arg => {
  console.log(arg);
  let query = `SELECT * FROM tb_nota JOIN tb_penjualan, tb_metode_pembayaran, tb_barang ON tb_nota.penjualan_id = tb_penjualan.penjualan_id AND tb_penjualan.penjualan_metode_pembayaran = tb_metode_pembayaran.metode_id AND tb_penjualan.penjualan_nama_barang = tb_barang.barang_id`;
  if (arg.id != null) {
    query += ` WHERE tb_nota.penjualan_id = ${arg.id}`;
  }
  if (arg.notaId != null) {
    query += ` WHERE tb_nota.nota_id = ${arg.notaId}`;
  }
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
