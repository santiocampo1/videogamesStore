import { DataTypes, Sequelize } from "sequelize";

const adminModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};

export default adminModel;
