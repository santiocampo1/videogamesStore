const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Videogame", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
