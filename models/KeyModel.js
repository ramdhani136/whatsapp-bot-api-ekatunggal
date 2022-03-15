module.exports = (sequelize, DataTypes) => {
  const Key = sequelize.define("keys", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return Key;
};
