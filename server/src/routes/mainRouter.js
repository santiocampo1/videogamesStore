const { Router } = require("express");
const videogameRouter = require("./Videogames/videogameRouter");
const genreRouter = require("./Genres/genreRouter");
const usersRouter = require("./Users/usersRouter");

const mainRouter = Router();

//? Videogames Routes
mainRouter.use("/videogames", videogameRouter);

//? Genres Routes
mainRouter.use("/genres", genreRouter);

//? Users Routes
mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
