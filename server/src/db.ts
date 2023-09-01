import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: string) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file: string) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model: any) => model(sequelize));
const modifiedModels: { [key: string]: any } = {};
let entries = Object.entries(sequelize.models);
entries.forEach((entry: any[]) => {
  const key = entry[0][0].toUpperCase() + entry[0].slice(1);
  modifiedModels[key] = entry[1];
});

const { Videogame, Genre } = modifiedModels;

// Relations
Videogame.belongsToMany(Genre, { through: "VideogameGenre" });
Genre.belongsToMany(Videogame, { through: "VideogameGenre" });

export const models = modifiedModels;
export const conn = sequelize;
