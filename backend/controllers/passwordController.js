const { validateEmail, User, validatePassword } = require("../DB/userModel");
const asyncHandler = require("express-async-handler");
const { VerificationToken } = require("../DB/verificationTokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const sendResetPassword = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  let verificationToken = await VerificationToken.findOne({
    userId: user._id,
  });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }
  const link = `${process.env.DOMAIN_LINK}/reset-password/${user._id}/${verificationToken.token}`;
  const htmlTemplate = `
  <a href="${link}">Click here to reset your password</a>
  `;
  await sendEmail(user.email, "Reset Password", htmlTemplate);
  res
    .status(200)
    .json({ message: "Password reset link to your email, check your inbox" });
});

const getResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: req.params.userId,
  });
  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
  }
  res.status(200).json({ message: "valid link" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({
    _id: req.params.userId,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const verificationToken = VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
  }

  if (!user.isVerfied) {
    user.isVerfied = true;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();

  await verificationToken.deleteOne();

  res.status(200).json({ message: "password reset successfully" });
});
module.exports = {
  sendResetPassword,
  getResetPasswordLink,
  resetPassword,
};
