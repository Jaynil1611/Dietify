const { Product } = require("../models/product.model");
const { getNormalizedProductList } = require("../utils/normalizeData");

const getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    products = getNormalizedProductList(products);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "unable to get products",
      errorMessage: err.message,
    });
  }
};

const getProduct = (req, res) => {
  let { product } = req;
  res.status(200).json({ success: true, product });
};

module.exports = { getProducts, getProduct };
