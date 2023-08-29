const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); // Parser function
app.use(mainRouter);

module.exports = app;
