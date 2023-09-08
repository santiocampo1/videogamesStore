import { Router } from "express";
import {
  deleteVideogameHandler,
  getByIdHandler,
  getVideogamesHandler,
  modifyVideogameHandler,
  postVideogameHandler,
} from "../../handlers/videogames/handlerVideogames";

const videogameRouter = Router();

// Route to get a videogame by ID.
videogameRouter.get("/:id", getByIdHandler);

// Route to get the videogames.
videogameRouter.get("/", getVideogamesHandler);

// Route to create a videogame in Db.
videogameRouter.post("/", postVideogameHandler);

// Route to modify a videogame in Db.
videogameRouter.patch("/:id", modifyVideogameHandler);

// Route to delete a videogame in Db.
videogameRouter.delete("/:id", deleteVideogameHandler);

export default videogameRouter;
