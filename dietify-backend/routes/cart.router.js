const express = require("express");
const router = express.Router({ mergeParams: true });
const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");
const { getNormalizedList, getNormalizedProduct } = require("../utils/utils");

// userId ---> 6082a6790b7e110cb360760e

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.params;
      const userCartProducts = await Cart.find({ userId }).populate(
        "productId"
      );
      const normalizedCart = getNormalizedList(userCartProducts);
      res.status(200).json({ success: true, cart: normalizedCart });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.mesaage });
    }
  })
  .post(async (req, res) => {
    let newProduct = req.body;
    const { userId } = req.params;
    const { id: productId } = newProduct;

    newProduct = { productId, userId, ...newProduct };
    newProduct = new Cart(newProduct);

    try {
      await newProduct.save();
      let updatedProduct = await Cart.findOne({ userId, productId }).populate(
        "productId"
      );
      updatedProduct = getNormalizedProduct(updatedProduct);

      res.status(201).json({ success: true, cart: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

router.param("productId", async (req, res, next, productId) => {
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
});

router
  .route("/:productId")
  .get(async (req, res) => {
    let { product } = req;
    res
      .status(200)
      .json({ success: true, cart: getNormalizedProduct(product) });
  })
  .post(async (req, res, next) => {
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
  })
  .delete(async (req, res, next) => {
    let { product } = req;
    try {
      await product.remove();
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
