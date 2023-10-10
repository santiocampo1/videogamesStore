const { getAllGenres } = require("../../controllers/Genres/controllerGenres");

//Handler to get all genres
const getAllGenresHandler = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllGenresHandler,
};
