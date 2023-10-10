const { Router } = require("express");
const { getAllGenresHandler } = require("../../handlers/Genres/handlerGenres");

const genreRouter = Router();

// Route to get the genres.
genreRouter.get("/", getAllGenresHandler);

module.exports = genreRouter;
