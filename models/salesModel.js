module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define("sales", {
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
    id_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index_of: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return Sales;
};
