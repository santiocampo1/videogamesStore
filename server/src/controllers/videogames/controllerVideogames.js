const axios = require("axios");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
const { Videogame, Genre, DisableVideogame } = require("../../db");
dotenv.config();
const { API_KEY } = process.env;

const getVideogamesApi = async () => {
  try {
    let apiVideogames = [];
    let dbVideogames = [];

    let i = 0;
    let videogameData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    while (i < 5) {
      apiVideogames = apiVideogames.concat(videogameData.data.results);
      videogameData = await axios.get(videogameData.data.next);
      i++;
    }
    dbVideogames = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    dbVideogames = dbVideogames.map((game) => {
      return {
        id: game.id,
        name: game.name,
        platforms: game.platforms.split(", "),
        genres: game.Genres.map((genre) => genre.name),
        image: game.image,
        releaseDate: game.releaseDate,
        rating: game.rating,
      };
    });

    apiVideogames = apiVideogames.map((game) => {
      return {
        id: game.id,
        name: game.name,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres.map((genre) => genre.name),
        image: game.background_image,
        releaseDate: game.released,
        rating: game.rating,
      };
    });
    console.log(apiVideogames.length);
    const allVideogames = apiVideogames.concat(dbVideogames);
    return allVideogames;
  } catch (error) {
    return error.message;
  }
};

const getVideogamesDb = async () => {
  const allVideogamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });

  const mapVideogameInfo = allVideogamesDb.map((videogame) => ({
    id: videogame.id,
    name: videogame.name,
    image: videogame.background_image,
    description: videogame.description,
    platforms: videogame.platforms,
    released: videogame.released,
    rating: videogame.rating,
    genres: videogame.genres ? videogame.genres.map((genre) => genre.name) : [],
  }));

  return mapVideogameInfo;
};

const createVideogame = async (name, description, platforms, image, genres) => {
  try {
    const [createdGame, wasCreated] = await Videogame.findOrCreate({
      where: { name },
      defaults: {
        name,
        description,
        platforms,
        image,
      },
    });

    if (!wasCreated) {
      throw new Error("Videogame with that name already exists.");
    }

    const genreInstances = await Genre.findAll({
      where: {
        name: {
          [Op.in]: genres,
        },
      },
    });

    if (genreInstances.length !== genres.length) {
      throw new Error("One or more genres do not exist in the database.");
    }

    await createdGame.setGenres(genreInstances);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllVideogames = async () => {
  try {
    const videogamesDb = await getVideogamesDb();
    const videogamesApi = await getVideogamesApi();

    const combinedVideogames = [...videogamesDb, ...videogamesApi];

    return combinedVideogames;
  } catch (error) {
    return error.message;
  }
};

const getVideogameByName = async (name) => {
  try {
    const lowerName = name.toLowerCase();
    const videogamesApi = await getVideogamesApi();
    const videogamesDb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    const videogameFoundByApi = videogamesApi.filter((game) =>
      game.name.toLowerCase().includes(lowerName)
    );
    const allResults = [...videogamesDb, ...videogameFoundByApi];

    if (allResults.length === 0) {
      throw new Error(`Videogame ${name} does not exist. Try again.`);
    }

    return allResults;
  } catch (error) {
    return error;
  }
};

const getVideogameById = async (id) => {
  try {
    const foundVideogame = await Videogame.findByPk(id);

    if (!foundVideogame) {
      throw new Error(`Videogame with ID ${id} was not found. Try again.`);
    }

    return foundVideogame;
  } catch (error) {
    throw new Error(error.message);
  }
};

const modifyVideogame = async (
  id,
  name,
  description,
  platforms,
  image,
  releaseDate,
  rating,
  genres
) => {
  const foundVideogame = await Videogame.findByPk(id);

  if (!foundVideogame) {
    throw new Error("Videogame was not found");
  }

  await foundVideogame.update({
    name,
    description,
    platforms,
    image,
    releaseDate,
    rating,
    genres,
  });

  return foundVideogame;
};

const deleteVideogame = async (id) => {
  try {
    const videogame = await Videogame.findByPk(id);
    if (!videogame)
      throw new Error(`Videogame with ID ${id} does not exist. Try again.`);

    await DisableVideogame.create({ ...videogame.dataValues });

    await videogame.destroy();
    return videogame;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getVideogamesApi,
  getVideogamesDb,
  createVideogame,
  getAllVideogames,
  getVideogameByName,
  getVideogameById,
  modifyVideogame,
  deleteVideogame,
};
