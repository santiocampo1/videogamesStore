const server = require("./src/app");
const { conn } = require("./src/db");
const PORT = 3001;
const { getAllGenres } = require("./src/controllers/Genres/controllerGenres");

conn.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });

  await getAllGenres();
});
