import { Request, Response } from "express";
import { getUsers } from "../../controllers/Users/controllerUsers";

// Handler to get all the users.
export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsers();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
