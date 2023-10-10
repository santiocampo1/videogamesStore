const {
  createUserDb,
  deleteUser,
  getByEmail,
  getById,
  getUsers,
  updateUser,
} = require("../../controllers/Users/controllerUsers");

//Handler to get all users
const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to create an user
const createUserHandler = async (req, res) => {
  const { name, email, image } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Required data is missing");
    }

    const registeredUser = await createUserDb(email, name, image);
    res.status(200).json(registeredUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to get user by email
const getUserByEmailHandler = async (req, res) => {
  const { email } = req.params;

  try {
    const userByEmail = await getByEmail(email);
    res.status(200).json(userByEmail);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to get user by ID
const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await getById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Handler to update user
const updateUserHandler = async (req, res) => {
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
    res.status(400).json(error.message);
  }
};

//Handler to delete user
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getById(id);

    if (user) {
      await deleteUser(id);
    }

    res.status(200).send(`User with ID ${id} has been deleted.`);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
};
