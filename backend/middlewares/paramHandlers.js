const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { Wishlist } = require("../models/wishlist.model");

const cartParamHandler = async (req, res, next, productId) => {
  try {
    const product = await Cart.findOne({ productId }).populate("productId");
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found!" });
    }
    req.product = product;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Couldn't retrieve the product" });
  }
};

const productParamHandler = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found! " });
    }
    req.product = { id: product.id, ...product._doc, _id: undefined };
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Couldn't retrieve the product" });
  }
};

const wishlistParamHandler = async (req, res, next, productId) => {
  try {
    const product = await Wishlist.findOne({ productId }).populate("productId");
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found!" });
    }
    req.product = product;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Couldn't retrieve the product" });
  }
};

module.exports = {
  cartParamHandler,
  productParamHandler,
  wishlistParamHandler,
};
