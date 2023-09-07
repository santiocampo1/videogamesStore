import { Router } from "express";
import { getAllGenresHandler } from "../../handlers/videogames/handlerGenres";

const genreRouter = Router();

// Route to get the genres.
genreRouter.get("/", getAllGenresHandler);

export default genreRouter;