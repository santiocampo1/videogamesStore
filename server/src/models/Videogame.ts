import { DataTypes, Sequelize } from "sequelize";

const videogameModel = (sequelize: Sequelize) => {
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
        defaultValue: DataTypes.NOW,
      },

      rating: {
        type: DataTypes.INTEGER,
      },

      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );
};

export default videogameModel;
