import { DataTypes, Sequelize } from "sequelize";

const disableUserModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "DisableUser",
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

      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Talento Anónmimo",
      },

      dni: {
        type: DataTypes.INTEGER,
        validate: {
          min: 10000000,
          max: 99999999,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      aboutMe: {
        type: DataTypes.STRING,
      },

      image: {
        type: DataTypes.STRING,

        validate: {
          isUrl: true,
        },
      },

      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
      },

      nationality: {
        type: DataTypes.STRING,
      },

      socialNetwork: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      reviews: {
        type: DataTypes.FLOAT,
      },

      reviewsCount: {
        type: DataTypes.INTEGER,
      },

      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};

export default disableUserModel;
