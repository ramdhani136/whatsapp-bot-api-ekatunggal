module.exports = (sequelize, DataTypes) => {
  const UriFile = sequelize.define("urifiles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_bot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  });

  return UriFile;
};
