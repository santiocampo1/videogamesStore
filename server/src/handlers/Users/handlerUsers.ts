import { Request, Response } from "express";
import {
  createUserDb,
  getUsers,
} from "../../controllers/Users/controllerUsers";

// Handler to get all the users.
export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsers();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

// Handler to create an user.
export const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, image } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Required data is missing");
    }

    const registeredUser = await createUserDb(email, name, image);

    res.status(200).json(registeredUser);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
