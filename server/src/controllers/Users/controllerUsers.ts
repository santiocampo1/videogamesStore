import axios, { all } from "axios";
import { User } from "../../db";

//! Interfaces
interface APIUser {
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

export const getUsers = async () => {
  try {
    const res = await axios("https://randomuser.me/api/?results=100");
    const usersData = res.data.results;

    const allUsers = await Promise.all(
      usersData.map(async (user: APIUser) => {
        const name = `${user.name.first} ${user.name.last}`;
        const { email } = user;
        const { gender } = user;
        const nationality = user.nationality;
        const password = user.password;
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
