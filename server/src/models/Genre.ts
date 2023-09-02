import { DataTypes, Sequelize } from "sequelize";

const GenreModel = (sequelize: Sequelize) => {
  sequelize.define(
    "Genre",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};

export default GenreModel;
