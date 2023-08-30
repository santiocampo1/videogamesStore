const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      platforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      releaseDate: {
        type: DataTypes.DATEONLY,
      },

      rating: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
