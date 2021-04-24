const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model");
const { extend } = require("lodash");
const { getNormalizedProductList } = require("../utils/utils");

router.route("/").get(async (req, res) => {
  try {
    let products = await Product.find();
    products = getNormalizedProductList(products);
    res.json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
  }
});

// Middleware to extract the product from id
router.param("productId", async (req, res, next, productId) => {
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
});

router.route("/:productId").get((req, res) => {
  let { product } = req;
  res.status(200).json({ success: true, product });
});

module.exports = router;
