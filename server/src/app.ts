import express from "express";
import morgan from "morgan";
import mainRouter from "./routes/mainRouter";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); // Parser function
app.use(mainRouter);

export default app;
