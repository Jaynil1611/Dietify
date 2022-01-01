const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  cartQuantity: Number,
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
