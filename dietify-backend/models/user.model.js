const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (email) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/g.test(value);
        },
        message: () =>
          `Password should contain atleast 6 characters (atleast one number & one letter)`,
      },
      required: [true, "Password is required"],
    },
    firstname: { type: String, required: "First name is required" },
    lastname: { type: String, required: "Last name is required" },
  },
  opts
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
