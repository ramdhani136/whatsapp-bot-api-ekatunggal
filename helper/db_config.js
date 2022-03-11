var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

module.exports = db;
