const axios = require("axios");
const { DisableUser, User } = require("../../db");

// Controller to get users from api and save them in Db.
const getUsers = async () => {
  try {
    const res = await axios("https://randomuser.me/api/?results=100");
    const usersData = res.data.results;

    const allUsers = await Promise.all(
      usersData.map(async (user) => {
        const name = `${user.name.first} ${user.name.last}`;
        const { email, gender, nationality, password } = user;
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
    return error.message;
  }
};

// Controller to create an user.
const createUserDb = async (email, name, image) => {
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
const getByEmail = async (email) => {
  try {
    const foundUser = await User.findAll({ where: { email: email } });

    if (!foundUser) {
      throw new Error(`User with ${email} was not found. Try again.`);
    }

    return foundUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller to get an user by ID.
const getById = async (id) => {
  try {
    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      throw new Error(`User with ID ${id} was not found. Try again.`);
    }

    return foundUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller to update an user.
const updateUser = async (id, updatedData) => {
  try {
    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      throw new Error(`User with ID ${id} does not exist. Try again.`);
    }

    await userToUpdate.update(updatedData);

    return userToUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller to delete an user.
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User was not found. Try again.");

    await DisableUser.create({ ...user.dataValues, available: false });
    await user.destroy();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUsers,
  createUserDb,
  getByEmail,
  getById,
  updateUser,
  deleteUser,
};
