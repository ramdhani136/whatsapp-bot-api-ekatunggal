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
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return Bot;
};
