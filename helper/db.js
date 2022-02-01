const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://lqiyxhuxafvqja:4d2bf699a8a87855f214b22d9415346ce9ea706d5cb5e54f0e1fff9c9991c6df@ec2-3-222-49-168.compute-1.amazonaws.com:5432/dbqnmg7nm83lra",
  //   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query(
      "SELECT * FROM sessions ORDER BY created_at DESC"
    );
    if (res.rows.length) return res.rows;
    return "";
  } catch (err) {
    throw err;
  }
};

const readLimit = async () => {
  try {
    const res = await client.query(
      "SELECT * FROM sessions ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length) return res.rows[0];
    return "";
  } catch (err) {
    throw err;
  }
};

const findSession = async (id) => {
  try {
    const res = await client.query("SELECT * FROM sessions WHERE id=$1", [id]);
    if (res.rows.length) return res.rows[0];
    return "";
  } catch (err) {
    throw err;
  }
};

const saveSession = (name, deskripsi, username) => {
  client.query(
    "INSERT INTO sessions (name,deskripsi,username) VALUES($1,$2,$3)",
    [name, deskripsi, username],
    (err, result) => {
      if (err) {
        console.error("Failed to save session!", err);
      } else {
        console.log("sukses insert data");
      }
    }
  );
};

const removeSession = (id) => {
  client.query("DELETE  FROM sessions WHERE id=$1", [id], (err, result) => {
    if (err) {
      console.error("Failed to remove session!", err);
    } else {
      console.log("Session Deleted");
    }
  });
};

const updateSession = async (ready, id, session) => {
  client.query(
    "UPDATE sessions SET session=$3,ready=$1 WHERE id=$2",
    [ready, id, session],
    (err, result) => {
      if (err) {
        console.error("Failed to update session!", err);
      } else {
        console.log("Session update");
      }
    }
  );
};

module.exports = {
  readLimit,
  findSession,
  readSession,
  saveSession,
  removeSession,
  updateSession,
};
