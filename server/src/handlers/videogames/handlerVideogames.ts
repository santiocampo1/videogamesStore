import { Request, Response } from "express";
import {
  createVideogame,
  getAllVideogames,
} from "../../controllers/videogames/controllerVideogames";

// Handler to get all the videogames.
export const getVideogamesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const videogames = await getAllVideogames();
    res.status(200).json(videogames); // Enviando la respuesta al cliente
  } catch (error) {
    // Especifica un tipo para el error
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

// Handler to create a videogame.
export const postVideogameHandler = async (req: Request, res: Response) => {
  const { name, description, platforms, image, releaseDate, rating } = req.body;

  try {
    await createVideogame(
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating
    );
    res.status(200).send("Videogame successfully created!");
  } catch (error) {
    res.status(400).json(error);
  }
};
