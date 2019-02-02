var sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cons = require("../assets/constanta.js");
const dbPath = path.resolve(__dirname, cons.uriDb);
const db = new sqlite3.Database(dbPath);

const Promise = require("bluebird");

exports.insertKuota = arg => {
  let query =
    "INSERT INTO tb_kuota (nik, barang, jumlah_barang, start_kuota, end_kuota) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.run(query, arg, err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

exports.getKuota = arg => {
  console.log(arg);
  let query = `SELECT SUM(tb_kuota.jumlah_barang) as jumlah_barang, MIN(tb_kuota.start_kuota) as start_kuota, tb_kuota.end_kuota, tb_barang.* FROM tb_kuota JOIN tb_barang WHERE tb_barang.barang_id = tb_kuota.barang AND tb_kuota.nik = "${
    arg.nik
  }"`;
  if (arg.id_barang != null) {
    query += ` AND tb_kuota.barang = ${arg.id_barang}`;
  }

  query += " GROUP BY tb_kuota.barang";

  return new Promise((resolve, reject) => {
    db.all(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length > 0) {
          resolve(data[0]);
        } else {
          resolve({ jumlah_barang: 0 });
        }
        // console.log(data[0].jumlah_barang)
        // return data[0].jumlah_barang
      }
    });
  });
};

exports.updateKuota = () => {};

exports.deleteKuota = arg => {
  let query = `DELETE FROM tb_kuota WHERE nik = "${arg.nik}" AND barang = "${
    arg.barang
  }"`;

  return new Promise((resolve, reject) => {
    db.run(query, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
