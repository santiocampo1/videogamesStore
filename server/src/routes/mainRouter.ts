import { Router } from "express";
import videogameRouter from "./videogames/videogameRouter";
import genreRouter from "./Genres/genreRouter";
import usersRouter from "./Users/usersRouter";

const mainRouter = Router();

//? Videogames Routes
mainRouter.use("/videogames", videogameRouter);

//? Genres Routes
mainRouter.use("/genres", genreRouter);

//? Users Routes
mainRouter.use("/users", usersRouter);

export default mainRouter;
