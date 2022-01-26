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

const findSession = async (id) => {
  try {
    const res = await client.query("SELECT * FROM sessions WHERE id=$1", [id]);
    if (res.rows.length) return res.rows[0];
    return "";
  } catch (err) {
    throw err;
  }
};

const saveSession = (session) => {
  client.query(
    "INSERT INTO sessions (session) VALUES($1)",
    [session],
    (err, result) => {
      if (err) {
        console.error("Failed to save session!", err);
      } else {
        console.log("Session Saved");
      }
    }
  );
};

const removeSession = () => {
  client.query("DELETE FROM sessions", (err, result) => {
    if (err) {
      console.error("Failed to remove session!", err);
    } else {
      console.log("Session Deleted");
    }
  });
};

const updateSession = async (ready, id, client) => {
  client.query(
    "UPDATE sessions SET client=$3,ready=$1 WHERE id=$2",
    [ready, id, client],
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
  findSession,
  readSession,
  saveSession,
  removeSession,
  updateSession,
};