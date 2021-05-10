const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
