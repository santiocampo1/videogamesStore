const { Router } = require("express");
const mainRouter = Router();

mainRouter.get("/users", (req, res) => {
  res.status(200).send("hello");
});

module.exports = mainRouter;
