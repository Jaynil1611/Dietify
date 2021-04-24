const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function createUser() {
  try {
    const user = new User({ username: 'diet', password: 'diet1234' });
    const savedUser = await user.save();
  } catch (error) {
    console.error("Error while registering user", error.message);
  }
}

module.exports = { User, createUser }