import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { API_KEY } = process.env;

interface PlatformDetail {
  platform: {
    name: string;
  };
}

interface Game {
  name: string;
  description_raw?: string;
  description?: string;
  platforms?: PlatformDetail[];
  background_image: string;
  released: string;
  rating: number;
}

export const getApiVideogames = async () => {
  try {
    const response = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    const videogamesData = response.data.results.map((game: Game) => ({
      name: game.name,
      description: game.description_raw || game.description,
      platforms: game.platforms
        ? game.platforms.map(
            (platform: PlatformDetail) => platform.platform.name
          )
        : [],
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
    }));

    console.log(videogamesData);

    return videogamesData;
  } catch (error) {
    console.error("Error fetching videogames data:", error);
  }
};
