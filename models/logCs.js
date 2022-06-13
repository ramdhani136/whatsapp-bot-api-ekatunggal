module.exports = (sequelize, DataTypes) => {
  const LogCs = sequelize.define("logcs", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_sales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index_of: true,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index_of: true,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closeAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  });

  return LogCs;
};
