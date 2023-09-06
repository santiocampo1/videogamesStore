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
interface Game {
  id?: any;
  name: string;
  description_raw?: string;
  description?: string;
  platforms?: PlatformDetail[];
  background_image: string;
  released: string;
  rating: number;
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
  rating: number
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

    return createdGame;
  } catch (error) {
    return error;
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
    return error;
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