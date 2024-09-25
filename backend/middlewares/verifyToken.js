const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "invalid token, access denied",
      });
    }
  } else {
    return res.status(401).json({
      message: "No authorization header, invalid access",
    });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        message: "Admin only allowed to this action",
      });
    }
  });
};
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      res.status(401).json({
        message: "User himself only allowed to this action",
      });
    }
  });
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        message: "User himself or Admin only allowed to this action",
      });
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndAuthorization,
};
