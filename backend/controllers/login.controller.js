const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyUserCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "User doesn't exist!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
          expiry: "24h",
        },
        process.env["SECRET"]
      );
      const { firstname, lastname } = user;
      return res
        .status(201)
        .json({ success: true, token, firstname, lastname });
    }

    res
      .status(401)
      .json({ success: false, errorMessage: "Passwords don't match" });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyUserCredentials };
