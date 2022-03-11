var db = require("../helper/db_config");

db.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  //   let sql = `INSERT INTO customers (name, address)
  //                 VALUES ('Starbucks', 'Lombok Epicentrum Mall')`;

  //   db.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //   });
});
