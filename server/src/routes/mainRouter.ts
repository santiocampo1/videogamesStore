import { Router } from "express";
import videogameRouter from "./videogames/videogameRouter";

const mainRouter = Router();

//? Videogames Routes
mainRouter.use("/videogames", videogameRouter);

export default mainRouter;
