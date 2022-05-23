module.exports = (sequelize, DataTypes) => {
  const botContact = sequelize.define("botContact", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_bot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index_of: true,
    },
    id_sales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index_of: true,
    },
  });

  return botContact;
};
