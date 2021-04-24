const express = require("express");
const router = express.Router({ mergeParams: true });
const { Wishlist } = require("../models/wishlist.model");
const { extend } = require('lodash');
const { getNormalizedList, getNormalizedProduct } = require("../utils/utils");

router.param('productId', async (req, res, next, productId) => {
  try {
    const product = await Wishlist.findOne({ productId }).populate('productId');
    if (!product) {
      return res.status(400).json({ success: false, message: "Product Not Found!" });
    }
    req.product = product;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Couldn't retrieve the product" })
  }
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.params;
      const userWishProducts = await Wishlist.find({ userId }).populate('productId');
      const normalizedCart = getNormalizedList(userWishProducts);
      res.status(200).json({ success: true, wishes: normalizedCart });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.mesaage })
    }
  })
  .post(async (req, res) => {
    let newProduct = req.body;
    const { userId } = req.params;
    const { id: productId } = newProduct;

    newProduct = { productId, userId, ...newProduct }
    newProduct = new Wishlist(newProduct);

    try {
      await newProduct.save();
      let updatedProduct = await Wishlist.findOne({ userId, productId }).populate('productId')

      updatedProduct = getNormalizedProduct(updatedProduct)
      return res.status(201).json({ success: true, wish: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });


router
  .route('/:productId')
  .get(async (req, res) => {
    let { product } = req;
    res.status(200).json({ success: true, wish: getNormalizedProduct(product) });
  })
  .post(async (req, res, next) => {
    let { product } = req;
    const productUpdates = req.body;
    product = extend(product, productUpdates)
    try {
      let savedProduct = await product.save();
      savedProduct = getNormalizedProduct(savedProduct);
      res.status(201).json({ success: true, wish: savedProduct });
    } catch (error) {
      next(error)
    }
  });

module.exports = router;