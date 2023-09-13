import axios, { all } from "axios";
import { DisableUser, User } from "../../db";

//! Interfaces
interface APIUser {
  id: any;
  email: string;
  name: {
    first: string;
    last: string;
  };
  gender: string;
  nationality: string;
  password: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dni: number;
  available: boolean;
  aboutMe: string;
  socialNetwork: string[];
  reviews: number;
  reviewsCount: number;
  creationDate: Date;
}

// Controller to get users from api and save them in Db.
export const getUsers = async () => {
  try {
    const res = await axios("https://randomuser.me/api/?results=100");
    const usersData = res.data.results;

    const allUsers = await Promise.all(
      usersData.map(async (user: APIUser) => {
        const name = `${user.name.first} ${user.name.last}`;
        const { email } = user;
        const { gender } = user;
        const { nationality } = user;
        const { password } = user;
        const image = user.picture.large;
        const available = true;
        const dni =
          Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
        const aboutMe = "...";

        const savedUser = await User.create({
          name,
          dni,
          email,
          password,
          image,
          gender,
          nationality,
          available,
          aboutMe,
        });
        return savedUser;
      })
    );

    return allUsers;
  } catch (error) {
    return (error as Error).message;
  }
};

// Controller to create an user.
export const createUserDb = async (
  email: string,
  name: string,
  image: string
) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      name,
      image,
    },
  });

  return user;
};

// Controller to get an user by email.
export const getByEmail = async (email: string) => {
  try {
    const foundUser = await User.findAll({ where: { email: email } });

    if (!foundUser) {
      throw new Error(`User with ${email} was not found. Try again.`);
    }

    return foundUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Controller to get an user by ID.
export const getById = async (id: any) => {
  try {
    const foundUser = await User.findByPk(id);

    if (!foundUser)
      throw new Error(`User with ID ${id} was not found. Try again.`);

    return foundUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Controller to update an user.
export const updateUser = async (id: any, updatedData: any) => {
  try {
    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      throw new Error(`User with ID ${id} does not exist. Try again.`);
    }

    await userToUpdate.update(updatedData);

    return userToUpdate;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Controller to delete an user.
export const deleteUser = async (id: any) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User was not found. Try again.");

    await DisableUser.create({ ...user.dataValues, available: false });
    await user.destroy();

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
