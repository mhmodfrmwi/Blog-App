const {
  validateRegisteration,
  User,
  validateLogin,
} = require("../DB/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { VerificationToken } = require("../DB/verificationTokenModel");
const sendEmail = require("../utils/sendEmail");
const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisteration(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const { userName, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      message: "User is already exist",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ userName, email, password: hashedPassword });
  await newUser.save();

  const verificationToken = new VerificationToken({
    userId: newUser._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  const link = `${process.env.DOMAIN_LINK}/users/${newUser._id}/verify/${verificationToken.token}`;
  const htmlTemplate = `
    <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify</a>
    </div>
  `;
  await sendEmail(newUser.email, "Verify your email", htmlTemplate);
  return res.status(201).json({
    message: "We sent you an email verification, check your inbox",
  });
});

const login = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      message: "Email or Password is not correct",
    });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return res.status(400).json({
      message: "Email or Password is not correct",
    });
  }

  if (!user.isVerfied) {
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

    const link = `${process.env.DOMAIN_LINK}/users/${user._id}/verify/${verificationToken.token}`;
    const htmlTemplate = `
    <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify</a>
    </div>
  `;
    await sendEmail(user.email, "Verify your email", htmlTemplate);

    return res.status(400).json({
      message: "We sent you an email verification, check your inbox",
    });
  }

  const token = user.generateToken();
  res.status(200).json({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    profilePhoto: user.profilePhoto,
    isAdmin: user.isAdmin,
    token,
  });
});

const verifyUserAcount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
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

  user.isVerfied = true;
  await user.save();

  await verificationToken.deleteOne();
  res.status(200).json({ message: "Your account has been verfied" });
});
module.exports = {
  register,
  login,
  verifyUserAcount,
};
