module.exports = (sequelize, DataTypes) => {
  const SalesGroup = sequelize.define("salesGroup", {
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return SalesGroup;
};
