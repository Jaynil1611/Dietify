const { Wishlist } = require("../models/wishlist.model");
const { extend } = require("lodash");
const {
  getNormalizedList,
  getNormalizedProduct,
} = require("../utils/normalizeData");

const getWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const userWishProducts = await Wishlist.find({ userId })
      .populate("productId")
      .select("-__v");
    const normalizedCart = getNormalizedList(userWishProducts);
    res.status(200).json({ success: true, wishes: normalizedCart });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.mesaage });
  }
};

const postWishlist = async (req, res) => {
  let newProduct = req.body;
  const { userId } = req;
  newProduct = { productId: newProduct.id, userId, ...newProduct };
  let updatedProduct = new Wishlist(newProduct);
  try {
    updatedProduct = await updatedProduct.save();
    const wish = extend(updatedProduct._doc, newProduct);
    return res.status(201).json({ success: true, wish });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
};

const getWishlistItem = async (req, res) => {
  let { product } = req;
  res.status(200).json({ success: true, wish: getNormalizedProduct(product) });
};

const updateWishlistItem = async (req, res, next) => {
  let { product } = req;
  const productUpdates = req.body;
  product = extend(product, productUpdates);
  try {
    let savedProduct = await product.save();
    savedProduct = getNormalizedProduct(savedProduct);
    res.status(201).json({ success: true, wish: savedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteWishlistItem = async (req, res, next) => {
  let { product } = req;
  try {
    await product.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    next(err);
  }
};

module.exports = {
  getWishlist,
  postWishlist,
  getWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
};
