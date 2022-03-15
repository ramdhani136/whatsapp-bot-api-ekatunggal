const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sessions = require("./sessionModel")(sequelize, DataTypes);
db.keys = require("./KeyModel")(sequelize, DataTypes);
db.urifiles = require("./uriFile")(sequelize, DataTypes);
db.bots = require("./bot")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("resync!");
});

module.exports = db;
