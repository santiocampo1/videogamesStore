import { Request, Response } from "express";
import { getApiVideogames } from "../../controllers/videogames/controllerVideogames";

export const getVideogamesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const videogames = await getApiVideogames();
    res.status(200).json(videogames); // Enviando la respuesta al cliente
  } catch (error) {
    // Especifica un tipo para el error
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};
