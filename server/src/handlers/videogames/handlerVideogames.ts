import { Request, Response } from "express";
import {
  createVideogame,
  deleteVideogame,
  getAllVideogames,
  getVideogameById,
  getVideogameByName,
  modifyVideogame,
} from "../../controllers/videogames/controllerVideogames";

// Handler to get all the videogames.
export const getVideogamesHandler = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    if (name && typeof name === "string") {
      const foundVideogame: any = await getVideogameByName(name);

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
    res.status(500).json((error as Error).message);
  }
};

// Handler to create a videogame.
export const postVideogameHandler = async (req: Request, res: Response) => {
  const { name, description, platforms, image, releaseDate, rating, genres } =
    req.body;

  try {
    await createVideogame(
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      genres
    );
    res.status(200).send("Videogame successfully created!");
  } catch (error) {
    res.status(400).json(error);
  }
};

// Handler to get Videogame by Id.
export const getByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const videogameById = await getVideogameById(id);

    if (!videogameById) {
      return res.status(400).send(`Videogame with ID ${id} does not exist.`);
    }

    res.status(200).json(videogameById);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

// Handler to modify a Videogame by ID.
export const modifyVideogameHandler = async (req: Request, res: Response) => {
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
    res.status(400).json((error as Error).message);
  }
};

// Handler to delete a videogame.
export const deleteVideogameHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGame = await deleteVideogame(id);

    res
      .status(200)
      .send(`Videogame with ID ${id} has been deleted succesfully.`);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
