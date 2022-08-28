const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstname, lastname, email } = await User.findById(userId);
    res
      .status(200)
      .json({ success: true, user: { firstname, lastname, email } });
  } catch (error) {
    next(error);
  }
};

const signUpNewUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "User already exists!" });
    }

    user = new User({ firstname, lastname, email, password });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.set("password", newPassword);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registration successful" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId } = req;
    const { password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "User doesn't exist!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      user.set("password", newPassword);
      await user.save();
      return res
        .status(201)
        .json({ success: true, message: "Password updated successfully" });
    }

    res.status(403).json({
      success: false,
      errorMessage: "Old and new passwords cannot be the same",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { changePassword, getUserDetails, signUpNewUser };
