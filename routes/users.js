const usersRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth");

const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  filterPassword,
  hashPassword,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkPasswordLength,
} = require("../middlewares/users");

const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe
} = require("../controllers/users");
const { login } = require("../controllers/auth");

usersRouter.get("/users", findAllUsers,filterPassword, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.put(
  "/users/:id",
  // checkIsUserExists, В теории нет
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.post(
  "/auth/local/register",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkPasswordLength,
  hashPassword,  
  createUser,
  sendUserCreated,
  login,   
);

usersRouter.get("/me", checkAuth,sendMe)
usersRouter.delete("/users/:id",checkAuth, deleteUser, sendUserDeleted);
module.exports = usersRouter;

