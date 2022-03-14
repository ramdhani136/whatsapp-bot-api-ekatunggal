module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "wabot",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquired: 30000,
    idle: 10000,
  },
};
