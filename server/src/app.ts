import express from "express";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes/mainRouter";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(morgan("dev"));
app.use(mainRouter);

export default app;
