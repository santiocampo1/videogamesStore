const axios = require("axios");
const dotenv = require("dotenv");
const { Genre } = require("../../db");
dotenv.config();
const { API_KEY } = process.env;

const getAllGenres = async () => {
  try {
    const response = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const allGenresData = response.data.results.map((genre) => genre.name);

    await Genre.bulkCreate(allGenresData.map((genre) => ({ name: genre })));

    return allGenresData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getAllGenres };
