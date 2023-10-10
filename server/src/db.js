const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
const modifiedModels = {};
let entries = Object.entries(sequelize.models);
entries.forEach((entry) => {
  const key = entry[0][0].toUpperCase() + entry[0].slice(1);
  modifiedModels[key] = entry[1];
});

const {
  Videogame,
  Genre,
  User,
  Admin,
  DisableUser,
  DisableVideogame,
  VideogameFav,
} = sequelize.models;

// Relations
Videogame.belongsToMany(Genre, { through: "VideogameGenre" });
Genre.belongsToMany(Videogame, { through: "VideogameGenre" });

User.belongsToMany(VideogameFav, { through: "UserSelectVideogameAsFav" });
VideogameFav.belongsToMany(User, { through: "UserSelectVideogameAsFav" });

User.belongsToMany(Videogame, { through: "UserVideogame" });
Videogame.belongsToMany(User, { through: "UserVideogame" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
