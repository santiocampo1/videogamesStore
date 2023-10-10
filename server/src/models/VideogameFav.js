const { DataTypes } = require("sequelize");

const videogameFavModel = (sequelize) => {
  return sequelize.define(
    "VideogameFav",
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
    { freezeTableName: true, timestamps: false }
  );
};

module.exports = videogameFavModel;
