const { login } = require("../controllers/auth.js");

const authRouter = require("express").Router();


authRouter.post("/auth/login", login);

module.exports = authRouter;

