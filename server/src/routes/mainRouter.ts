import { Router } from "express";
import videogameRouter from "./videogames/videogameRouter";
import genreRouter from "./Genres/genreRouter";

const mainRouter = Router();

//? Videogames Routes
mainRouter.use("/videogames", videogameRouter);

//? Genres Routes
mainRouter.use("/genres", genreRouter);

export default mainRouter;
