module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define("customers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_menuAktif: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_prevMenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_prevKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  });

  return Customers;
};
