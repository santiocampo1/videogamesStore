import { Router, Request, Response } from "express";
import { getVideogamesHandler } from "../../handlers/videogames/handlerVideogames";

const videogameRouter = Router();

videogameRouter.get("/", getVideogamesHandler);

export default videogameRouter;
