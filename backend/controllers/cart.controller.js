const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");
const {
  getNormalizedList,
  getNormalizedProduct,
} = require("../utils/normalizeData");

const getCartList = async (req, res) => {
  try {
    const { userId } = req;
    const userCartProducts = await Cart.find({ userId })
      .populate("productId")
      .select("-__v");
    const normalizedCart = getNormalizedList(userCartProducts);
    res.status(200).json({ success: true, cart: normalizedCart });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.mesaage });
  }
};

const postCartList = async (req, res) => {
  let newProduct = req.body;
  const { userId } = req;
  newProduct = { productId: newProduct.id, userId, ...newProduct };
  let updatedProduct = new Cart(newProduct);
  try {
    updatedProduct = await updatedProduct.save();
    const cart = extend(updatedProduct._doc, newProduct);
    res.status(201).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
};

const getCartItem = async (req, res) => {
  let { product } = req;
  res.status(200).json({ success: true, cart: getNormalizedProduct(product) });
};

const updateCartItem = async (req, res, next) => {
  let { product } = req;
  const productUpdates = req.body;
  product = extend(product, productUpdates);
  try {
    let savedProduct = await product.save();
    savedProduct = getNormalizedProduct(savedProduct);
    res.status(201).json({ success: true, cart: savedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  let { product } = req;
  try {
    await product.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const { userId } = req;
    await Cart.deleteMany({ userId });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartList,
  postCartList,
  getCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
