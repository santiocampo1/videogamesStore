import axios from "axios";
import dotenv from "dotenv";
import { Genre } from "../../db";
dotenv.config();
const { API_KEY } = process.env;

//! Interfaces
interface Genre {
  id: any;
  name: string;
}

export const getAllGenres = async () => {
  try {
    const response = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const allGenresData = response.data.results.map(
      (genre: Genre) => genre.name
    );
    console.log(allGenresData);

    await Genre.bulkCreate(
      allGenresData.map((genre: Genre) => ({ name: genre }))
    );

    return "a";
  } catch (error) {}
};
