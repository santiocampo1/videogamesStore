const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(mainRouter);
app.use(express.json());

module.exports = app;
