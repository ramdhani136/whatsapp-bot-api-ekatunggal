const mysql = require("mysql2/promise");

const createConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wa_api",
  });
};

const getReplay = async (keyword) => {
  const connection = await createConnection();
  const [rows] = await connection.execute(
    "Select message from wa_replies where keyword = ?",
    [keyword]
  );
  if (rows.length > 0) return rows[0].message;
  return false;
};

module.exports = { getReplay, createConnection };
