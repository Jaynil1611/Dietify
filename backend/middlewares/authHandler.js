const jwt = require("jsonwebtoken");

const authHandler = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env["SECRET"]);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Not Authorized" });
  }
};

module.exports = { authHandler };
