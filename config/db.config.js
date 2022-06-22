module.exports = {
  HOST: "localhost",
  USER: "it",
  PASSWORD: "!Etms000!",
  DB: "wabot",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquired: 30000,
    idle: 10000,
  },
};
