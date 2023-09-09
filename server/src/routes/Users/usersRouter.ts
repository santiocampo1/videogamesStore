import { Router } from "express";
import { getAllUsersHandler } from "../../handlers/Users/handlerUsers";

const usersRouter = Router();

// Route to get the users.
usersRouter.get("/", getAllUsersHandler);

export default usersRouter;
