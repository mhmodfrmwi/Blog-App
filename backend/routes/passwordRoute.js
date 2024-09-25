const express = require("express");
const {
  sendResetPassword,
  getResetPasswordLink,
  resetPassword,
} = require("../controllers/passwordController");
const route = express.Router();

route.post("/reset-password-link", sendResetPassword);
route
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordLink)
  .post(resetPassword);
module.exports = route;
