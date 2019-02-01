var sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cons = require("../assets/constanta.js");
const dbPath = path.resolve(__dirname, cons.uriDb);
const db = new sqlite3.Database(dbPath);

const Promise = require("bluebird");

exports.get = arg => {
  let query = "SELECT * FROM tb_user";
  if (arg.level != null) {
    query += ` WHERE user_level = ${arg.level}`;
  }

  if (arg.password != null) {
    query += ` AND user_password = ${arg.password}`;
  }

  if (arg.id != null) {
    query += ` WHERE user_id = ${arg.id}`;
  }

  return new Promise((resolve, reject) => {
    db.all(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.update = arg => {
  let query =
    "UPDATE tb_user SET user_password=?, user_username=? WHERE user_id=?";
  return new Promise((resolve, reject) => {
    db.run(query, arg, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
