module.exports = (sequelize, DataTypes) => {
  const Bot = sequelize.define("bots", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_menuAktif: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_prevKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_prevMenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_afterMenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    forward: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return Bot;
};
