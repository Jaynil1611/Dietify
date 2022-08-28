const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Wishlist = mongoose.model("Wishlist", WishListSchema);

module.exports = { Wishlist };
