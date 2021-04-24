const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  status: String,
});

const Wishlist = mongoose.model("Wishlist", WishListSchema);

module.exports = { Wishlist }