import axios from "axios";
import dotenv from "dotenv";
import { Op } from "sequelize";
import { Videogame, Genre } from "../../db";
dotenv.config();
const { API_KEY } = process.env;

//! Interfaces
interface PlatformDetail {
  platform: {
    name: string;
  };
}

interface Genre {
  id: any;
  name: string;
}

interface Game {
  id?: any;
  name: string;
  description_raw?: string;
  description?: string;
  platforms?: PlatformDetail[];
  background_image: string;
  released: string;
  rating: number;
  genres: Genre[];
}

//! Controllers
// Controller to get the games from the API.
export const getVideogamesApi = async () => {
  try {
    const response = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    const videogamesData = response.data.results.map((game: Game) => ({
      name: game.name,
      description: game.description_raw || game.description,
      platforms: game.platforms
        ? game.platforms
            .map((platform: PlatformDetail) => platform.platform.name)
            .join(", ")
        : "",
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => {
        return genre.name;
      }),
    }));

    return videogamesData;
  } catch (error) {
    return error;
  }
};

// Controller to get the videogames from the Db.
export const getVideogamesDb = async () => {
  const allVideogamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });

  const mapVideogameInfo = allVideogamesDb.map((videogame: Game) => {
    return {
      id: videogame.id,
      name: videogame.name,
      image: videogame.background_image,
      description: videogame.description,
      platforms: videogame.platforms,
      released: videogame.released,
      rating: videogame.rating,
      genres: videogame.genres
        ? videogame.genres.map((genre) => genre.name)
        : [],
    };
  });

  return mapVideogameInfo;
};

// Controller to create a videogame in Db.
export const createVideogame = async (
  name: string,
  description: string,
  platforms: PlatformDetail[],
  image: string,
  releaseDate: string,
  rating: number,
  genres: Genre[]
) => {
  try {
    const [createdGame, wasCreated] = await Videogame.findOrCreate({
      where: { name },
      defaults: {
        name,
        description,
        platforms,
        image,
        releaseDate,
        rating,
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
    throw new Error((error as Error).message);
  }
};

// Controller to get all the videogames
export const getAllVideogames = async () => {
  try {
    const videogamesDb = await getVideogamesDb();
    const videogamesApi = await getVideogamesApi();

    const combinedVideogames = [...videogamesDb, ...videogamesApi];

    return combinedVideogames;
  } catch (error) {
    return (error as Error).message;
  }
};

// Controller to get videogames by name.
export const getVideogameByName = async (name: string) => {
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

    const videogameFoundByApi = videogamesApi.filter((game: Game) =>
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

// Controller to get Videogames by Id.
export const getVideogameById = async (id: any) => {
  try {
    const foundVideogame = await Videogame.findByPk(id);

    if (!foundVideogame) {
      throw new Error(`Videogame with ID ${id} was not found. Try again.`);
    }

    return foundVideogame;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Controller to modify a Videogame by Id.
export const modifyVideogame = async (
  id: any,
  name: string,
  description: string,
  platforms: PlatformDetail[],
  image: string,
  releaseDate: string,
  rating: number,
  genres: Genre[]
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
