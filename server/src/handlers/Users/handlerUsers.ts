import { Request, Response } from "express";
import {
  createUserDb,
  deleteUser,
  getByEmail,
  getById,
  getUsers,
  updateUser,
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

// Handler to get user by email.
export const getUserByEmailHandler = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const userByEmail = await getByEmail(email);

    res.status(200).json(userByEmail);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

// Handler to get user by ID.
export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userById = await getById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

// Handler to update an user.
export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    email,
    name,
    dni,
    password,
    available,
    aboutMe,
    picture,
    gender,
    nationality,
    socialNetwork,
    reviews,
    reviewsCount,
  } = req.body;

  try {
    const user = await getById(id);

    if (user) {
      const updatedData = {
        email,
        name,
        dni,
        password,
        available,
        aboutMe,
        picture,
        gender,
        nationality,
        socialNetwork,
        reviews,
        reviewsCount,
      };

      await updateUser(id, updatedData);

      res.status(200).send(`User ${id} has been successfully updated.`);
    }
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getById(id);

    if (user) {
      await deleteUser(id);
    }

    res.status(200).send(`User with ID ${id} has been deleted.`);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
