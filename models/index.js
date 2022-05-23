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
db.customers = require("./customer")(sequelize, DataTypes);
db.menu = require("./menuModel")(sequelize, DataTypes);
db.sales = require("./salesModel")(sequelize, DataTypes);
db.salesGroup = require("./salesGroupModel")(sequelize, DataTypes);
db.botContact = require("./botContact")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("resync!");
});

// Bots
db.bots.hasMany(db.urifiles, {
  foreignKey: "id_bot",
  as: "urifiles",
});

db.bots.belongsTo(db.keys, {
  foreignKey: "id_key",
  as: "key",
});

db.bots.belongsTo(db.keys, {
  foreignKey: "id_prevKey",
  as: "prevKey",
});

db.bots.belongsTo(db.menu, {
  foreignKey: "id_menuAktif",
  as: "menuAktif",
});

db.bots.belongsTo(db.menu, {
  foreignKey: "id_prevMenu",
  as: "prevMenu",
});

db.bots.belongsTo(db.menu, {
  foreignKey: "id_afterMenu",
  as: "afterMenu",
});

// End

// urifiles
db.urifiles.belongsTo(db.bots, {
  foreignKey: "id_bot",
  as: "bots",
});
// End

// customer
db.customers.belongsTo(db.menu, {
  foreignKey: "id_menuAktif",
  as: "menuAktif",
});

db.customers.belongsTo(db.menu, {
  foreignKey: "id_prevMenu",
  as: "prevMenu",
});

db.customers.belongsTo(db.keys, {
  foreignKey: "id_prevKey",
  as: "prevKey",
});
// End

// Sales
db.sales.belongsTo(db.salesGroup, {
  foreignKey: "id_group",
  as: "group",
});

// Sales Group
db.salesGroup.hasMany(db.sales, {
  foreignKey: "id_group",
  as: "sales",
});

//  botContact
db.botContact.belongsTo(db.sales, {
  foreignKey: "id_sales",
  as: "sales",
});

module.exports = db;
