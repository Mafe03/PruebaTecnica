const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define(
    "ANIMALES",
    {
      nombreAnimal: {
        type: DataTypes.STRING(256),
        primaryKey: true,
      },
      descripcionAnimal: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      urlAnimal: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "ANIMALES",
    }
  );
};
