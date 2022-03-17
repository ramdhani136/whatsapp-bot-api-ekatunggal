module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define("menu", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return Menu;
};
