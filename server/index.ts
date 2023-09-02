import server from "./src/app";
import { conn } from "./src/db";
const PORT: number = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });
});
