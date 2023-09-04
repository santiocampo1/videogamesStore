import { Router } from "express";
import {
  getVideogamesHandler,
  postVideogameHandler,
} from "../../handlers/videogames/handlerVideogames";

const videogameRouter = Router();

// Route to get the videogames.
videogameRouter.get("/", getVideogamesHandler);

// Route to create a videogame in Db.
videogameRouter.post("/", postVideogameHandler);

export default videogameRouter;
