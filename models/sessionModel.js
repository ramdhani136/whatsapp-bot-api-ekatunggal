module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("sessions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    session: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ready: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: { type: DataTypes.STRING, allowNull: true },
  });

  return Session;
};
