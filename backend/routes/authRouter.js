const express = require("express");
const {
  register,
  login,
  verifyUserAcount,
} = require("../controllers/authController");

const route = express.Router();
route.use(express.json());
route.post("/register", register);
route.post("/login", login);
route.get("/:userId/verify/:token", verifyUserAcount);

module.exports = route;
