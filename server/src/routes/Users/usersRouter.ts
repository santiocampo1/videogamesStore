import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../../handlers/Users/handlerUsers";

const usersRouter = Router();

// Route to update an user.
usersRouter.put("/:id", updateUserHandler);

// Route to create an user.
usersRouter.post("/register", createUserHandler);

// Route to delete an user.
usersRouter.delete("/:id", deleteUserHandler);

// Route to get an user by email.
usersRouter.get("/email/:email", getUserByEmailHandler);

// Route to get an user by ID.
usersRouter.get("/:id", getUserByIdHandler);

// Route to get the users.
usersRouter.get("/", getAllUsersHandler);

export default usersRouter;
