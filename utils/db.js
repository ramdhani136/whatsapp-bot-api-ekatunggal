const { Client } = require("pg");

const client = new Client({
  // connectionString:
  //   "postgres://usuiekgaavxkpc:8db59411db2a543610ac10a4d658a2b4ff6121b54d1e3b0af735dc403d3222b4@ec2-34-205-209-14.compute-1.amazonaws.com:5432/dbjbrm0h20kd3k",
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query(
      "SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length) return res.rows[0];
    return "";
  } catch (err) {
    throw err;
  }
};

const saveSession = (session) => {
  client.query(
    "INSERT INTO wa_sessions (session) VALUES($1)",
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
  client.query("DELETE FROM wa_sessions", (err, result) => {
    if (err) {
      console.error("Failed to remove session!", err);
    } else {
      console.log("Session Deleted");
    }
  });
};

module.exports = { readSession, saveSession, removeSession };
