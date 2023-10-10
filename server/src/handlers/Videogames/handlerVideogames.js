const {
  createVideogame,
  deleteVideogame,
  getAllVideogames,
  getVideogameById,
  getVideogameByName,
  modifyVideogame,
} = require("../../controllers/videogames/controllerVideogames");

//Handler to get all the videogames.
const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name && typeof name === "string") {
      const foundVideogame = await getVideogameByName(name);

      if (foundVideogame.length === 0) {
        return res
          .status(400)
          .send(`Videogame ${name} does not exist. Try again.`);
      }

      return res.status(200).json(foundVideogame);
    }

    const videogames = await getAllVideogames();
    res.status(200).json(videogames);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Handler to create a videogame.
const postVideogameHandler = async (req, res) => {
  const { name, description, platforms, image, genres } = req.body;

  console.log(req.body);

  try {
    await createVideogame(name, description, platforms, image, genres);
    res.status(200).send("Videogame successfully created!");
  } catch (error) {
    res.status(400).json(error);
  }
};

//Handler to get videogame by ID.
const getByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const videogameById = await getVideogameById(id);

    if (!videogameById) {
      return res.status(400).send(`Videogame with ID ${id} does not exist.`);
    }

    res.status(200).json(videogameById);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to modify a videogame by ID.
const modifyVideogameHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, platforms, image, releaseDate, rating, genres } =
    req.body;

  try {
    const videogame = await modifyVideogame(
      id,
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      genres
    );

    if (!videogame) {
      return res
        .status(400)
        .send(
          `Videogame with ID ${id} was not found or does not exist in database.`
        );
    }

    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to delete a videogame by ID.
const deleteVideogameHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await deleteVideogame(id);

    res
      .status(200)
      .send(`Videogame with ID ${id} has been deleted succesfully.`);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getVideogamesHandler,
  postVideogameHandler,
  getByIdHandler,
  modifyVideogameHandler,
  deleteVideogameHandler,
};
