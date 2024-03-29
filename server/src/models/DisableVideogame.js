const { DataTypes } = require("sequelize");

const disableVideogameModel = (sequelize) => {
  sequelize.define(
    "DisableVideogame",
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

module.exports = disableVideogameModel;
