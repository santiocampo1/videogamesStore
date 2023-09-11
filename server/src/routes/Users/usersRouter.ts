import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
} from "../../handlers/Users/handlerUsers";

const usersRouter = Router();

// Route to get the users.
usersRouter.get("/", getAllUsersHandler);

// Route to create an user.
usersRouter.post("/register", createUserHandler);

export default usersRouter;
