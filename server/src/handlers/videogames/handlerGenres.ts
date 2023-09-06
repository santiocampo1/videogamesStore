import { Request, Response } from "express";
import { getAllGenres } from "../../controllers/videogames/controllerGenres";

export const getAllGenresHandler = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
