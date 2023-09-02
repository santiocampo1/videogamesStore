import { Router, Request, Response } from "express";

const mainRouter = Router();

mainRouter.get("/users", (req: Request, res: Response) => {
  res.status(200).send("hello");
});

export default mainRouter;
